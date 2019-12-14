import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Library } from '../models/library.model';
import { Observable } from 'rxjs';

@Injectable()
export class LibraryService {

    protected baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    public fetchLibraries(): Observable<Library[]> {
        return this.http.get<Library[]>(this.baseUrl + '/libraries');
    }

    public createLibrary(library: Library): Observable<Library> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<Library>(this.baseUrl + '/libraries', library, { headers, responseType: 'text' as 'json' });
    }

    public deleteLibrary(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + '/libraries/' + id);
    }

}
