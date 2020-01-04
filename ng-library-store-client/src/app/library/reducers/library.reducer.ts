import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as libraryActions from '../actions/library.actions';
import { Library } from '../models/library.model';

export const adapter: EntityAdapter<Library> = createEntityAdapter<Library>({
    sortComparer: sortByCreationDate
});

export function sortByCreationDate(ob1: Library, ob2: Library): number {
    const d1 = ob1.creationDate;
    const d2 = ob2.creationDate;
    if (!d1 || !d2) {
        return 0;
    }
    if (d1.getTime() === d2.getTime()) {
        return 0;
    }
    if (d1 > d2) {
        return 1;
    }
    if (d1 < d2) {
        return -1;
    }
}

export interface State extends EntityState<Library> {
    isLoading: boolean;
    error?: Error | any;
}

export const initialState: State = adapter.getInitialState({
    isLoading: false,
    error: null
});

const libraryReducer = createReducer(
    initialState,
    on(libraryActions.loadLibraries, state => {
        return ({ ...state, isLoading: true});
    }),
    on(libraryActions.loadLibrariesSuccess, (state, { payload }) => {
        return adapter.addAll(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(libraryActions.loadLibrariesFailure, (state, error) => {
        return {
            ...state,
            isLoading: false,
            error
        };
    }),
    on(libraryActions.createLibrary, (state, { payload }) => {
        return adapter.addOne(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(libraryActions.createLibrarySuccess, state => {
        return ({ ...state, isLoading: false });
    }),
    on(libraryActions.createLibraryFailure, (state, error) => {
        return ({ ...state, isLoading: false, error });
    }),
    on(libraryActions.deleteLibrary, (state, { payload }) => {
        return adapter.removeOne(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(libraryActions.deleteLibrarySuccess, (state, { }) => {
        return ({ ...state, isLoading: false});
    }),
    on(libraryActions.deleteLibraryFailure, (state, error) => {
        return ({ ...state, isLoading: false, error });
    })
);

export function reducer(state: State | undefined, action: Action) {
    return libraryReducer(state, action);
}
