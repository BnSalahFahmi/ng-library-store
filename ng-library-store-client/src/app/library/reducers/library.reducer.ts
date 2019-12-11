import { createReducer, on, Action } from '@ngrx/store';
import * as libraryActions from '../actions/library.actions';
import { Library } from '../models/library.model';

export interface State {
    libraries: Library[];
    isLoading: boolean;
    errorMessage: string;
}

export const initialState: State = {
    libraries: [],
    isLoading: false,
    errorMessage: ''
};

const libraryReducer = createReducer(
    initialState,
    on(libraryActions.loadLibraries, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(libraryActions.loadLibrariesSuccess, (state, { libraries }) => {
        return ({ ...state, isLoading: false, errorMessage: null, libraries });
    }),
    on(libraryActions.loadLibrariesFailure, (state, { errorMessage }) => {
        return ({ ...state, isLoading: false, errorMessage: errorMessage });
    }),
    on(libraryActions.createLibrary, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(libraryActions.createLibrarySuccess, (state, {}) => {
        return ({ ...state, isLoading: false, errorMessage: null });
    }),
    on(libraryActions.createLibraryFailure, (state, { errorMessage }) => {
        return ({ ...state, isLoading: false, errorMessage: errorMessage });
    })
);

export function reducer(state: State | undefined, action: Action) {
    return libraryReducer(state, action);
}
