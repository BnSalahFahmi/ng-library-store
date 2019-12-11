import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as libraryActions from './../actions/library.actions';
import { LibraryService } from '../services/library.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Library } from '../models/library.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LibraryEffects {

    constructor(private actions$: Actions, private libraryService: LibraryService, private toastrService: ToastrService) {

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
}
