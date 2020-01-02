import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as libraryActions from './../actions/library.actions';
import { LibraryActionTypes } from './../actions/library.actions';
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
            ofType(LibraryActionTypes.LoadLibraries),
            mergeMap(() =>
                this.libraryService.fetchLibraries().pipe(
                    map((data: Library[]) => {
                        return libraryActions.loadLibrariesSuccess({ data });
                    }),
                    catchError((error: Error) => {
                        this.toastrService.error(error.message, 'Error');
                        return of(libraryActions.loadLibrariesFailure({ error }));
                    })
                )
            )
        )
    );

    CreateLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LibraryActionTypes.CreateLibrary),
            mergeMap(payload =>
                this.libraryService.createLibrary((payload as any).library)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Library Saved Successfully', 'Success');
                            this.router.navigate(['/library/list']);
                            return libraryActions.createLibrarySuccess();
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(libraryActions.createLibraryFailure({ error }));
                        })
                    )
            )
        )
    );

    DeleteLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LibraryActionTypes.DeleteLibrary),
            mergeMap(payload =>
                this.libraryService.deleteLibrary((payload as any).libraryId)
                    .pipe(
                        map(() => {
                            this.toastrService.success('Library Deleted Successfully', 'Success');
                            return libraryActions.loadLibraries();
                        }),
                        catchError((error: Error) => {
                            this.toastrService.error(error.message, 'Error');
                            return of(libraryActions.deleteLibraryFailure({ error }));
                        })
                    )
            )
        )
    );
}
