import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import {
    loadLibraries,
    loadLibrariesSuccess,
    loadLibrariesFailure,
    createLibrary,
    createLibrarySuccess,
    createLibraryFailure,
    deleteLibrary,
    deleteLibrarySuccess,
    deleteLibraryFailure
} from '../actions/library.actions';
import { LibraryActionTypes } from './../actions/library.actions';
import { LibraryService } from '../services/library.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
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
            ofType(LibraryActionTypes.LOAD_LIBRARIES),
            switchMap(() => this.libraryService.fetchLibraries()),
            map(libraries => loadLibrariesSuccess({ libraries })),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(loadLibrariesFailure({ error }));
            })
        )
    );

    CreateLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LibraryActionTypes.CREATE_LIBRARY),
            map((action) => (action as any).payload),
            switchMap(library => this.libraryService.createLibrary(library)),
            map(library => {
                this.toastrService.success('Library Saved Successfully', 'Success');
                this.router.navigate(['/library/list']);
                return createLibrarySuccess({ library });
            }),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(deleteLibraryFailure({ error}));
            })
        )
    );

    DeleteLibraryEffect$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(LibraryActionTypes.DELETE_LIBRARY),
            map((action) => (action as any).payload),
            switchMap(libraryId => this.libraryService.deleteLibrary(libraryId)),
            map(libraryId => {
                this.toastrService.success('Library Removed Successfully', 'Success');
                return deleteLibrarySuccess({ libraryId });
            }),
            catchError((error: Error) => {
                this.toastrService.error(error.message, 'Error');
                return of(deleteLibraryFailure({ error }));
            })
        )
    );
}
