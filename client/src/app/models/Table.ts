export class Table {
	public columns: Column[];
	public rows: object[];
}

export class Column {
	public key: string;
	public title: string;
	public static: boolean = false;
	public alignment: Alignment = Alignment.CENTER;
}

export enum TableKey {
	STATICS = 'statics',
	ROLL = 'roll',
	EXERCISE = 'exercise',
	EXTRAS = 'extras'
}

export enum Alignment {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right'
}
