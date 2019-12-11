import { createAction, props } from '@ngrx/store';
import { Library } from '../models/library.model';

export const loadLibraries = createAction(
    '[Library API] Load Libraries',
    props<{}>()
);

export const loadLibrariesSuccess = createAction(
    '[Library API] Load Libraries Success',
    props<{ libraries: Library[] }>()
);

export const loadLibrariesFailure = createAction(
    '[Library API] Load Libraries Failure',
    props<{ errorMessage: string }>()
);

export const createLibrary = createAction(
    '[Library API] Create Library',
    props<Library>()
);

export const createLibrarySuccess = createAction(
    '[Library API] Create Library Success',
    props<{}>()
);

export const createLibraryFailure = createAction(
    '[Library API] Create Library Failure',
    props<{ errorMessage: string }>()
);

