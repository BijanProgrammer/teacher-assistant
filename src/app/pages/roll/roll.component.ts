import {
	AfterViewInit,
	Component,
	ElementRef,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
	selector: 'app-roll',
	templateUrl: './roll.component.html',
	styleUrls: ['./roll.component.scss'],
	providers: [DatabaseService],
})
export class RollComponent implements AfterViewInit {
	@ViewChild('menu') menuRef: ElementRef;
	menuElement: HTMLElement;

	headCells;
	bodyRows;

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
		this.headCells = databaseService.getAll().roll.head.row.cells;
		this.bodyRows = databaseService.getAll().roll.body.rows;
	}

	ngAfterViewInit() {
		this.menuElement = this.menuRef.nativeElement;
	}

	extractData(row, key) {
		return row[`${key}`] || '_';
	}

	clickedOnCell(e: MouseEvent, rowIndex, key) {
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

	clickedOnMenuItem(status: string) {
		switch (status) {
			case 'EMPTY':
				this.editCell('');
				break;
			case 'PRESENT':
				this.editCell('حاضر');
				break;
			case 'ABSENT':
				this.editCell('غایب');
				break;
			case 'PLUS':
				this.editCell('مثبت');
				break;
			case 'MINUS':
				this.editCell('منفی');
				break;
			default:
				break;
		}

		this.closeMenu();
	}

	editCell(content) {
		if (!this.activeCell) return;

		this.databaseService.editCell(
			this.activeCell.rowIndex,
			this.activeCell.key,
			content
		);
	}

	closeMenu() {
		if (!this.activeCell) return;

		this.renderer.removeClass(this.menuElement, 'open');
		this.renderer.removeClass(this.activeCell.rowElement, 'active');
		this.renderer.removeClass(this.activeCell.cellElement, 'active');

		this.activeCell = null;
	}
}
