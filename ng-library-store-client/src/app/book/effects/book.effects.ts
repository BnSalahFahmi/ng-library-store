import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as BookActions from '../actions/book.actions';
import { BookService } from '../services/Book.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class BookEffects {

    constructor(private actions$: Actions, private bookService: BookService, private toastrService: ToastrService) {

    }

    CreateBookEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(BookActions.createBook),
            mergeMap(action =>
                this.bookService.createBook(action)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Book Saved Successfully', 'Success');
                            return BookActions.createBookSuccess({});
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(BookActions.createBookFailure({ errorMessage: error.message }));
                        })
                    )
            )
        )
    );
}
