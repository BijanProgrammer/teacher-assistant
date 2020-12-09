import {Component} from '@angular/core';

@Component({
	selector: 'ta-extras',
	templateUrl: './extras.component.html',
	styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent {
	menuItems;

	constructor() {
		this.menuItems = [
			{name: '1'},
			{name: '2'},
			{name: '3'},
			{name: '4'},
			{name: '5'}
		];
	}
}
