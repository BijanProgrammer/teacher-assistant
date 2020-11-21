import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Input,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	providers: [DatabaseService],
})
export class TableComponent implements AfterViewInit {
	@ViewChild('menu') menuRef: ElementRef;
	menuElement: HTMLElement;

	@Input() headCells;
	@Input() bodyRows;
	@Input() headName;
	@Input() menuItems;

	activeCell: {
		rowElement: HTMLElement;
		cellElement: HTMLElement;
		rowIndex: number;
		key: string;
	};

	constructor(
		public databaseService: DatabaseService,
		public renderer: Renderer2
	) {
		this.headCells = databaseService.getAll().head.rows[
			`${this.headName}`
		].cells;

		this.bodyRows = databaseService.getAll().body.rows;
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
