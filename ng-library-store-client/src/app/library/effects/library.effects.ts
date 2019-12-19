import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as libraryActions from './../actions/library.actions';
import { LibraryService } from '../services/library.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Library } from '../models/library.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class LibraryEffects {

    constructor(
        private actions$: Actions,
        private libraryService: LibraryService,
        private toastrService: ToastrService,
        private router: Router) {

    }

    LoadLibraries$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(libraryActions.loadLibraries),
            mergeMap(() =>
                this.libraryService.fetchLibraries().pipe(
                    map((data: Library[]) => {
                        return libraryActions.loadLibrariesSuccess({ libraries: data });
                    }),
                    catchError((error: Error) => {
                        this.toastrService.error(error.message, 'Error');
                        return of(libraryActions.loadLibrariesFailure({ errorMessage: error.message }));
                    })
                )
            )
        )
    );

    CreateLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(libraryActions.createLibrary),
            mergeMap(action =>
                this.libraryService.createLibrary(action)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Library Saved Successfully', 'Success');
                            this.router.navigate(['/library/list']);
                            return libraryActions.createLibrarySuccess({});
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(libraryActions.createLibraryFailure({ errorMessage: error.message }));
                        })
                    )
            )
        )
    );

    DeleteLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(libraryActions.deleteLibrary),
            mergeMap(action =>
                this.libraryService.deleteLibrary(action.libraryId)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Library Deleted Successfully', 'Success');
                            return libraryActions.loadLibraries({});
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(libraryActions.deleteLibraryFailure({ errorMessage: error.message }));
                        })
                    )
            )
        )
    );
}
