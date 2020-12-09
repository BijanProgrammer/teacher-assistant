import { Component } from '@angular/core';

@Component({
	selector: 'ta-exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent {
	menuItems;

	constructor() {
		this.menuItems = [
			{ name: '100' },
			{ name: '90' },
			{ name: '80' },
			{ name: '70' },
			{ name: '60' },
			{ name: '50' },
			{ name: '40' },
			{ name: '30' },
			{ name: '20' },
			{ name: '10' },
			{ name: '0' },
		];
	}
}
