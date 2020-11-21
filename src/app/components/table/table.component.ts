import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
	selector: 'ta-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	providers: [DatabaseService],
})
export class TableComponent implements OnInit, AfterViewInit {
	@ViewChild('menu') menuRef: ElementRef;
	menuElement: HTMLElement;

	@Input() headName;
	@Input() menuItems;

	bodyRows;
	headCells;

	activeCell: {
		rowElement: HTMLElement;
		cellElement: HTMLElement;
		rowIndex: number;
		key: string;
	};

	constructor(
		public databaseService: DatabaseService,
		public renderer: Renderer2
	) {}

	ngOnInit() {
		this.headCells = this.databaseService.getAll().head.rows[
			`${this.headName}`
		].cells;

		this.bodyRows = this.databaseService.getAll().body.rows;
	}

	ngAfterViewInit() {
		this.menuElement = this.menuRef.nativeElement;
	}

	@HostListener('document:click')
	@HostListener('document:scroll')
	clickedOnDocument() {
		this.closeMenu();
	}

	clickedOnCell(e: MouseEvent, rowIndex, key) {
		e.stopPropagation();

		this.closeMenu();

		this.headCells.forEach((cell) => {
			if (cell.name === key && cell.editable !== 'false') {
				this.activeCell = {
					rowElement: (e.target as HTMLElement).parentElement,
					cellElement: e.target as HTMLElement,
					rowIndex,
					key,
				};

				this.renderer.setStyle(
					this.menuElement,
					'left',
					`${e.clientX + 20}px`
				);

				this.renderer.setStyle(
					this.menuElement,
					'top',
					`${e.clientY}px`
				);

				const viewHeight = Math.max(
					document.documentElement.clientHeight || 0,
					window.innerHeight || 0
				);

				if (e.clientY > viewHeight / 2)
					this.renderer.addClass(this.menuElement, 'reverse');
				else this.renderer.removeClass(this.menuElement, 'reverse');

				this.renderer.addClass(this.menuElement, 'open');
				this.renderer.addClass(this.activeCell.rowElement, 'active');
				this.renderer.addClass(this.activeCell.cellElement, 'active');
			}
		});
	}

	clickedOnMenuItem(e, content: string) {
		e.stopPropagation();

		if (!this.activeCell) return;

		this.databaseService.editCell(
			this.activeCell.rowIndex,
			this.activeCell.key,
			content
		);

		this.closeMenu();
	}

	extractData(row, key) {
		return row[`${key}`] || '_';
	}

	closeMenu() {
		if (!this.activeCell) return;

		this.renderer.removeClass(this.menuElement, 'open');
		this.renderer.removeClass(this.activeCell.rowElement, 'active');
		this.renderer.removeClass(this.activeCell.cellElement, 'active');

		this.activeCell = null;
	}
}
