import { Component } from '@angular/core';

@Component({
	selector: 'ta-roll',
	templateUrl: './roll.component.html',
	styleUrls: ['./roll.component.scss'],
})
export class RollComponent {
	menuItems;

	constructor() {
		this.menuItems = [
			{ name: 'حاضر' },
			{ name: 'غایب' },
			{ name: 'مثبت' },
			{ name: 'منفی' },
		];
	}
}
