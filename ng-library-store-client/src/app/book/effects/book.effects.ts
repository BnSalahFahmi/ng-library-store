import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as bookActions from '../actions/book.actions';
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
            ofType(bookActions.loadBooks),
            mergeMap(() =>
                this.bookService.fetchBooks().pipe(
                    map((data: Book[]) => {
                        return bookActions.loadBooksSuccess({ books: data });
                    }),
                    catchError((error: Error) => {
                        this.toastrService.error(error.message, 'Error');
                        return of(bookActions.loadBooksFailure({ errorMessage: error.message }));
                    })
                )
            )
        )
    );

    CreateBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(bookActions.createBook),
            mergeMap(action =>
                this.bookService.createBook(action)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Book Saved Successfully', 'Success');
                            this.router.navigate(['/book/list']);
                            return bookActions.createBookSuccess({});
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(bookActions.createBookFailure({ errorMessage: error.message }));
                        })
                    )
            )
        )
    );

    DeleteBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(bookActions.deleteBook),
            mergeMap(action =>
                this.bookService.deleteLBook(action.bookId)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Book Deleted Successfully', 'Success');
                            return bookActions.loadBooks({});
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(bookActions.deleteBookFailure({ errorMessage: error.message }));
                        })
                    )
            )
        )
    );
}
