import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable()
export class BookService {

    protected baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    public createBook(book: Book): Observable<Book> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<Book>(this.baseUrl + '/books', book, { headers, responseType: 'text' as 'json' });
    }

}
