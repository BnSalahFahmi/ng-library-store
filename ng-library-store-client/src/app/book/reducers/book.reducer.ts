import { createReducer, on, Action } from '@ngrx/store';
import * as bookActions from '../actions/book.actions';
import { Book } from '../models/book.model';

export interface State {
    books: Book[];
    isLoading: boolean;
    errorMessage: string;
}

export const initialState: State = {
    books: [],
    isLoading: false,
    errorMessage: ''
};

const bookReducer = createReducer(
    initialState,
    on(bookActions.loadBooks, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(bookActions.loadBooksSuccess, (state, { books }) => {
        return ({ ...state, isLoading: false, errorMessage: null, books });
    }),
    on(bookActions.loadBooksFailure, (state, { errorMessage }) => {
        return ({ ...state, isLoading: false, errorMessage: errorMessage });
    }),
    on(bookActions.createBook, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(bookActions.createBookSuccess, (state, {}) => {
        return ({ ...state, isLoading: false, errorMessage: null });
    }),
    on(bookActions.createBookFailure, (state, { errorMessage }) => {
        return ({ ...state, isLoading: false, errorMessage: errorMessage });
    }),
    on(bookActions.deleteBook, state => {
        return ({ ...state, isLoading: true, errorMessage: null });
    }),
    on(bookActions.deleteBookSuccess, (state, {}) => {
        return ({ ...state, isLoading: false, errorMessage: null });
    }),
    on(bookActions.deleteBookFailure, (state, { errorMessage }) => {
        return ({ ...state, isLoading: false, errorMessage: errorMessage });
    })
);

export function reducer(state: State | undefined, action: Action) {
    return bookReducer(state, action);
}
