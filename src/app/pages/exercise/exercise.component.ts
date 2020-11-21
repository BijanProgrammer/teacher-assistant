import { Component, Renderer2 } from '@angular/core';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
	selector: 'app-exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.scss'],
	providers: [DatabaseService],
})
export class ExerciseComponent {
	headCells;
	bodyRows;

	constructor(
		public databaseService: DatabaseService,
		public renderer: Renderer2
	) {
		this.headCells = databaseService.getAll().head.rows.exercise.cells;
		this.bodyRows = databaseService.getAll().body.rows;
	}

	changedCellContent(e, rowIndex, key) {
		console.log(e.target.textContent);
		this.databaseService.editCell(rowIndex, key, e.target.textContent);
	}

	extractData(row, key) {
		return row[`${key}`] || '_';
	}
}
