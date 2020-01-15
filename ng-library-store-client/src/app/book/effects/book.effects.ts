import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import {
    loadBooks,
    loadBooksSuccess,
    loadBooksFailure,
    createBook,
    createBookSuccess,
    createBookFailure,
    deleteBook,
    deleteBookSuccess,
    deleteBookFailure,
    viewBookSuccess,
    viewBookFailure
} from '../actions/book.actions';
import { BookActionTypes } from './../actions/book.actions';
import { BookService } from '../services/Book.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/Book.model';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {

    constructor(
        private actions$: Actions,
        private bookService: BookService,
        private toastrService: ToastrService,
        private router: Router) {

    }

    LoadBooks$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookActionTypes.LOAD_BOOKS),
            switchMap(() => this.bookService.fetchBooks()),
            map(books => loadBooksSuccess({ books })),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(loadBooksFailure({ error }));
            })
        )
    );

    CreateBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookActionTypes.CREATE_BOOK),
            map((action) => (action as any).payload),
            switchMap(book => this.bookService.createBook(book)),
            map(book => {
                this.toastrService.success('Book Saved Successfully', 'Success');
                this.router.navigate(['/book/list']);
                return createBookSuccess({ book });
            }),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(createBookFailure({ error }));
            })
        )
    );

    ViewBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookActionTypes.VIEW_BOOK),
            map((action) => (action as any).payload),
            switchMap(bookId => this.bookService.fetchBook(bookId)),
            map(bookId => {
                return viewBookSuccess({ bookId });
            }),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(viewBookFailure({ error }));
            })
        )
    );

    DeleteBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookActionTypes.DELETE_BOOK),
            map((action) => (action as any).payload),
            switchMap(bookId => this.bookService.deleteLBook(bookId)),
            map(bookId => {
                this.toastrService.success('Book Removed Successfully', 'Success');
                return deleteBookSuccess({ bookId });
            }),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(deleteBookFailure({ error }));
            })
        )
    );
}
