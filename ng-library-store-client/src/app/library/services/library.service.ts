import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Library } from '../models/library.model';
import { Observable } from 'rxjs';

@Injectable()
export class LibraryService {

    protected URL = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    public fetchLibraries(): Observable<Library[]> {
        return this.http.get<Library[]>(this.URL + '/libraries');
    }

    public createLibrary(library: Library): Observable<Library> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<Library>(this.URL + '/libraries', library, { headers, responseType: 'text' as 'json'});
    }

}
