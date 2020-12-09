import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private readonly SERVER_URL = 'http://localhost:5000/';
	private readonly headers: HttpHeaders;

	constructor(private http: HttpClient) {
		this.headers = new HttpHeaders();
		this.headers.append('Content-Type', 'application/json; charset=utf-8');
	}

	getAll(): Observable<any> {
		return this.http.get<any>(this.SERVER_URL);
	}

	saveAll(database: any): void {
		this.http.post(this.SERVER_URL, database, {headers: this.headers}).subscribe();
	}
}
