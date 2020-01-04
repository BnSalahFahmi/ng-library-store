import { createAction, props } from '@ngrx/store';
import { Library } from '../models/library.model';

export enum LibraryActionTypes {
    LoadLibraries = '[Library] Load Libraries',
    LoadLibrariesSuccess = '[Library] Load Libraries Success',
    LoadLibrariesFail = '[Library] Load Libraries Fail',

    CreateLibrary = '[Library] Create Library',
    CreateLibrarySuccess = '[Library] Create Library Success',
    CreateLibraryFail = '[Library] Create Library Fail',

    DeleteLibrary = '[Library] Delete Library',
    DeleteLibrarySuccess = '[Library] Delete Library Success',
    DeleteLibraryFail = '[Library] Delete Library Fail'
}

export const loadLibraries = createAction(
    LibraryActionTypes.LoadLibraries
);

export const loadLibrariesSuccess = createAction(
    LibraryActionTypes.LoadLibrariesSuccess,
    props<{ data: Library[] }>()
);

export const loadLibrariesFailure = createAction(
    LibraryActionTypes.LoadLibrariesFail,
    props<{ error: Error | any }>()
);

export const createLibrary = createAction(
    LibraryActionTypes.CreateLibrary,
    props<{library: Library}>()
);

export const createLibrarySuccess = createAction(
    LibraryActionTypes.CreateLibrarySuccess
);

export const createLibraryFailure = createAction(
    LibraryActionTypes.CreateLibraryFail,
    props<{ error: Error | any }>()
);

export const deleteLibrary = createAction(
    LibraryActionTypes.DeleteLibrary,
    props<{libraryId: string}>()
);

export const deleteLibrarySuccess = createAction(
    LibraryActionTypes.DeleteLibrarySuccess
);

export const deleteLibraryFailure = createAction(
    LibraryActionTypes.DeleteLibraryFail,
    props<{ error: Error | any }>()
);


