export class Table {
	public columns: Column[];
	public rows: Row[];
}

export class Column {
	public key: string;
	public title: string;
	public alignment: Alignment = Alignment.CENTER;
}

export class Row {
	public cells: object[];
}

export enum TableKey {
	ROLL = 'roll',
	EXERCISE = 'exercise',
	EXTRAS = 'extras'
}

export enum Alignment {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right'
}
