import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DatabaseService} from '../../services/database.service';

@Component({
	selector: 'ta-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	providers: [DatabaseService]
})
export class TableComponent implements OnInit, AfterViewInit {
	@ViewChild('menu') menuRef: ElementRef;
	menuElement: HTMLElement;

	@Input() headName;
	@Input() menuItems;
	@Input() filters: string [];
	@Input() gridTemplateColumns: string;

	private database;

	activeCell: {
		rowElement: HTMLElement; cellElement: HTMLElement; rowIndex: number; key: string;
	};

	constructor(public databaseService: DatabaseService, public renderer: Renderer2) {
		this.databaseService.getAll().subscribe((data) => {
			this.database = data;
		});
	}

	get headCells(): any {
		return this.database?.head.rows[`${this.headName}`].cells;
	}

	get bodyRows(): any {
		return this.database?.body.rows;
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.menuElement = this.menuRef.nativeElement;
	}

	@HostListener('document:click') @HostListener('document:scroll') clickedOnDocument(): void {
		this.closeMenu();
	}

	clickedOnCell(e: MouseEvent, rowIndex, key): void {
		e.stopPropagation();

		this.closeMenu();

		this.headCells?.forEach((cell) => {
			if (cell.name === key && cell.editable !== 'false') {
				this.activeCell = {
					rowElement: (e.target as HTMLElement).parentElement,
					cellElement: e.target as HTMLElement,
					rowIndex,
					key
				};

				this.renderer.setStyle(this.menuElement, 'left', `${e.clientX + 20}px`);

				this.renderer.setStyle(this.menuElement, 'top', `${e.clientY}px`);

				const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

				if (e.clientY > viewHeight / 2) this.renderer.addClass(this.menuElement, 'reverse'); else this.renderer.removeClass(this.menuElement, 'reverse');

				this.renderer.addClass(this.menuElement, 'open');
				this.renderer.addClass(this.activeCell.rowElement, 'active');
				this.renderer.addClass(this.activeCell.cellElement, 'active');
			}
		});
	}

	clickedOnMenuItem(e, content: string): void {
		e.stopPropagation();

		if (!this.activeCell) return;

		this.database.body.rows[this.activeCell.rowIndex][`${this.activeCell.key}`] = content;
		this.databaseService.saveAll(this.database);

		this.closeMenu();
	}

	extractData(row, key): string {
		return row[`${key}`] || '_';
	}

	extractDetail(key): string | number {
		if ([
			'studentId',
			'firstName',
			'lastName'
		].includes(key)) return '';

		return this.bodyRows.filter(value => value[`${key}`] && !this.filters.includes(value[`${key}`])).length;
	}

	closeMenu(): void {
		if (!this.activeCell) return;

		this.renderer.removeClass(this.menuElement, 'open');
		this.renderer.removeClass(this.activeCell.rowElement, 'active');
		this.renderer.removeClass(this.activeCell.cellElement, 'active');

		this.activeCell = null;
	}
}
