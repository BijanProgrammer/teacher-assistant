import { Injectable } from '@angular/core';

import initialDatabase from '../../assets/database.json';

@Injectable({
	providedIn: 'root',
})
export class DatabaseService {
	private database: any;

	constructor() {
		this.database = JSON.parse(localStorage.getItem('database'));

		if (!this.database) {
			this.database = initialDatabase;
			this.save();
		}
	}

	save() {
		localStorage.setItem('database', JSON.stringify(this.database));
	}

	getAll() {
		return this.database;
	}

	editCell(rowIndex: number, key: string, content: string) {
		console.log(rowIndex);

		this.database.roll.body.rows[rowIndex][`${key}`] = content;
		this.save();
	}
}
