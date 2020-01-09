import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book.model';

@Injectable()
export class BookService {

    protected baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {

    }

    public fetchBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.baseUrl + '/books');
    }

    public createBook(book: Book): Observable<Book> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<Book>(this.baseUrl + '/books', book, { headers, responseType: 'text' as 'json' });
    }

    public fetchBook(bookId: String): Observable<Book> {
        return this.http.get<Book>(this.baseUrl + '/books/' + bookId);
    }

    public deleteLBook(id: string): Observable<string> {
        return this.http.delete<string>(this.baseUrl + '/books/' + id);
    }

}
