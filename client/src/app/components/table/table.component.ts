import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Column, Table, TableKey} from '../../models/Table';
import {MenuItem} from '../../models/Menu';

class ActiveCell {
	public rowElement: HTMLElement;
	public cellElement: HTMLElement;
	public rowIndex: number;
	public columnKey: string;
}

@Component({
	selector: 'ta-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	providers: [DatabaseService]
})
export class TableComponent implements OnInit, AfterViewInit {
	@ViewChild('menu') public menuRef: ElementRef;
	public menuElement: HTMLElement;
	
	@Input() public tableKey: TableKey;
	@Input() public menuItems: MenuItem[];
	@Input() public filters: string[];
	@Input() public gridTemplateColumns: string;
	
	public table: Table = null;
	public statics: Table = null;
	public columns: Column[] = null;
	public rows: object[] = null;
	
	private activeCell: ActiveCell;
	
	public constructor(public databaseService: DatabaseService, public renderer: Renderer2) {
	}
	
	public ngOnInit(): void {
		this.databaseService.loadTable(TableKey.STATICS)
			.subscribe(statics => {
				this.statics = statics;
				
				this.databaseService.loadTable(this.tableKey)
					.subscribe(table => {
						this.table = table;
						
						this.columns = [...this.statics.columns, ...this.table.columns];
						
						this.rows = [];
						for (let i = 0; i < this.statics.rows.length; i++)
							this.rows.push({...this.statics.rows[i], ...this.table.rows[i]});
					});
			});
	}
	
	public ngAfterViewInit(): void {
		this.menuElement = this.menuRef.nativeElement;
	}
	
	@HostListener('document:click')
	@HostListener('document:scroll')
	public clickedOnDocument(): void {
		this.closeMenu();
	}
	
	public cellClickHandler(e: MouseEvent, rowIndex: number, columnKey: string): void {
		e.stopPropagation();
		
		this.closeMenu();
		
		for (const column of this.table?.columns) {
			if (column.key === columnKey && !column.static) {
				this.activeCell = {
					rowElement: (e.target as HTMLElement).parentElement,
					cellElement: e.target as HTMLElement,
					rowIndex,
					columnKey
				};
				
				this.renderer.setStyle(this.menuElement, 'left', `${e.clientX + 20}px`);
				this.renderer.setStyle(this.menuElement, 'top', `${e.clientY}px`);
				
				const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
				
				if (e.clientY > viewHeight / 2)
					this.renderer.addClass(this.menuElement, 'reverse');
				else
					this.renderer.removeClass(this.menuElement, 'reverse');
				
				this.renderer.addClass(this.menuElement, 'open');
				this.renderer.addClass(this.activeCell.rowElement, 'active');
				this.renderer.addClass(this.activeCell.cellElement, 'active');
				
				break;
			}
		}
	}
	
	public menuItemClickHandler(e: MouseEvent, content: string): void {
		e.stopPropagation();
		
		if (!this.activeCell) return;
		
		this.table.rows[this.activeCell.rowIndex][this.activeCell.columnKey] = content;
		this.rows[this.activeCell.rowIndex][this.activeCell.columnKey] = content;
		this.databaseService.saveTable(this.tableKey, this.table).subscribe();
		
		this.closeMenu();
	}
	
	public filledCellsCount(columnKey: string): string | number {
		if ([
			'studentId',
			'firstName',
			'lastName'
		].includes(columnKey)) return '';
		
		return this.table.rows.filter(row => row[columnKey] && !this.filters.includes(row[columnKey])).length;
	}
	
	public closeMenu(): void {
		if (!this.activeCell) return;
		
		this.renderer.removeClass(this.menuElement, 'open');
		this.renderer.removeClass(this.activeCell.rowElement, 'active');
		this.renderer.removeClass(this.activeCell.cellElement, 'active');
		
		this.activeCell = null;
	}
}
