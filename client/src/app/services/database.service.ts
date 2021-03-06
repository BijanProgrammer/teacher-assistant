import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Table, TableKey} from '../models/Table';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private readonly SERVER_URL: string = 'http://localhost:5000/';
	private readonly TABLES_URL: string = this.SERVER_URL + 'tables/';
	private readonly HEADERS: HttpHeaders;
	
	public constructor(private http: HttpClient) {
		this.HEADERS = new HttpHeaders();
		this.HEADERS.append('Content-Type', 'application/json; charset=utf-8');
	}
	
	public loadTable(key: TableKey): Observable<Table> {
		return this.http.get<Table>(this.TABLES_URL + key);
	}
	
	public saveTable(key: TableKey, table: Table): Observable<void> {
		return this.http.post<void>(this.TABLES_URL + key, table, {headers: this.HEADERS});
	}
}
