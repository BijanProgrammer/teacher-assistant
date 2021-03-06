import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {TableHeadComponent} from './table-head/table-head.component';
import {TableBodyComponent} from './table-body/table-body.component';

@NgModule({
	declarations: [TableComponent, TableHeadComponent, TableBodyComponent],
	imports: [
		CommonModule
	],
	exports: [TableComponent]
})
export class TableModule {
}
