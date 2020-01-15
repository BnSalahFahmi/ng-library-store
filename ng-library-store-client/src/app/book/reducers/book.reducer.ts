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
    selectedBook: Book | null;
    isLoading: boolean;
    error?: Error | any;
}

export const initialState: State = adapter.getInitialState({
    selectedBook: null,
    isLoading: false,
    error: null
});

const bookReducer = createReducer(
    initialState,
    on(bookActions.loadBooks, state => {
        return ({ ...state, isLoading: true });
    }),
    on(bookActions.loadBooksSuccess, (state, { books }) => {
        return adapter.addAll(books, {
            ...state,
            isLoading: false
        });
    }),
    on(bookActions.loadBooksFailure, (state, error) => {
        return ({ ...state, isLoading: false, error: error.error });
    }),
    on(bookActions.createBook, (state, { book }) => {
        return ({ ...state, isLoading: true });
    }),
    on(bookActions.createBookSuccess, (state, { book }) => {
        return adapter.addOne(book, {
          ...state,
          isLoading: false
        });
    }),
    on(bookActions.createBookFailure, (state, error) => {
        return ({ ...state, isLoading: false, error: error.error });
    }),
    on(bookActions.viewBook, (state, { bookId }) => {
        return { ...state, selectedId: bookId, loading: true };
    }),
    on(bookActions.viewBookSuccess, (state, { bookId }) => {
        return ({ ...state, selectedBook: bookId, isLoading: false});
    }),
    on(bookActions.viewBookFailure, (state, error) => {
        return ({ ...state, isLoading: false, error: error.error });
    }),
    on(bookActions.deleteBook, (state, { bookId }) => {
        return ({ ...state, isLoading: true });
    }),
    on(bookActions.deleteBookSuccess, (state, { bookId }) => {
        return adapter.removeOne(bookId, {
          ...state,
          isLoading: false
        });
    }),
    on(bookActions.deleteBookFailure, (state, error) => {
        return ({ ...state, isLoading: false, error: error.error});
    })
);

export function reducer(state: State | undefined, action: Action) {
    return bookReducer(state, action);
}
