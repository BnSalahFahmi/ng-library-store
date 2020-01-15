import { createAction, props } from '@ngrx/store';
import { Library } from '../models/library.model';

export enum LibraryActionTypes {
    LOAD_LIBRARIES = '[Library] Load Libraries',
    LOAD_LIBRARIES_SUCCESS = '[Library] Load Libraries Success',
    LOAD_LIBRARIES_FAIL = '[Library] Load Libraries Fail',

    CREATE_LIBRARY = '[Library] Create Library',
    CREATE_LIBRARY_SUCCESS = '[Library] Create Library Success',
    CREATE_LIBRARY_FAIL = '[Library] Create Library Fail',

    DELETE_LIBRARY = '[Library] Delete Library',
    DELETE_LIBRARY_SUCCESS = '[Library] Delete Library Success',
    DELETE_LIBRARY_FAIL = '[Library] Delete Library Fail'
}

export const loadLibraries = createAction(
    LibraryActionTypes.LOAD_LIBRARIES
);

export const loadLibrariesSuccess = createAction(
    LibraryActionTypes.LOAD_LIBRARIES_SUCCESS,
    props<{ libraries: Library[] }>()
);

export const loadLibrariesFailure = createAction(
    LibraryActionTypes.LOAD_LIBRARIES_FAIL,
    props<{ error: Error }>()
);

export const createLibrary = createAction(
    LibraryActionTypes.CREATE_LIBRARY,
    props<{ library: Library }>()
);

export const createLibrarySuccess = createAction(
    LibraryActionTypes.CREATE_LIBRARY_SUCCESS,
    props<{ library: Library }>()
);

export const createLibraryFailure = createAction(
    LibraryActionTypes.CREATE_LIBRARY_FAIL,
    props<{ error: Error }>()
);

export const deleteLibrary = createAction(
    LibraryActionTypes.DELETE_LIBRARY,
    props<{ libraryId: string }>()
);

export const deleteLibrarySuccess = createAction(
    LibraryActionTypes.DELETE_LIBRARY_SUCCESS,
    props<{ libraryId: string }>()
);

export const deleteLibraryFailure = createAction(
    LibraryActionTypes.DELETE_LIBRARY_FAIL,
    props<{ error: Error }>()
);


