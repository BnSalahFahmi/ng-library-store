import { createReducer, on, Action } from '@ngrx/store';
import * as bookActions from '../actions/book.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models/Book.model';

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
    sortComparer: sortByCreationDate
});

export function sortByCreationDate(ob1: Book, ob2: Book): number {
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

export interface State extends EntityState<Book> {
    isLoading: boolean;
    error?: Error | any;
}

export const initialState: State = adapter.getInitialState({
    isLoading: false,
    error: null
});

const bookReducer = createReducer(
    initialState,
    on(bookActions.loadBooks, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(bookActions.loadBooksSuccess, (state, { payload }) => {
        return adapter.addAll(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(bookActions.loadBooksFailure, (state, error) => {
        return {
            ...state,
            isLoading: false,
            error
        };
    }),
    on(bookActions.createBook, (state, { payload }) => {
        return adapter.addOne(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(bookActions.createBookSuccess, (state, {}) => {
        return ({ ...state, isLoading: false, errorMessage: null });
    }),
    on(bookActions.createBookFailure, (state, error) => {
        return ({ ...state, isLoading: false, error });
    }),
    on(bookActions.deleteBook, (state, { payload }) => {
        return adapter.removeOne(payload, {
            ...state,
            isLoading: false
        });
    }),
    on(bookActions.deleteBookSuccess, (state, {}) => {
        return ({ ...state, isLoading: false});
    }),
    on(bookActions.deleteBookFailure, (state, error) => {
        return ({ ...state, isLoading: false, error });
    })
);

export function reducer(state: State | undefined, action: Action) {
    return bookReducer(state, action);
}
