import {Component} from '@angular/core';
import {MenuItem} from '../../models/Menu';
import {TableKey} from '../../models/Table';

@Component({
	selector: 'ta-roll',
	templateUrl: './roll.component.html',
	styleUrls: ['./roll.component.scss'],
})
export class RollComponent {
	public tableKey: TableKey = TableKey.ROLL;
	public menuItems: MenuItem[];
	
	constructor() {
		this.menuItems = [
			new MenuItem('حاضر'),
			new MenuItem('غایب'),
			new MenuItem('مثبت'),
			new MenuItem('منفی'),
		];
	}
}
