import { createAction, props } from '@ngrx/store';
import { Book } from '../models/Book.model';

export enum BookActionTypes {
    LOAD_BOOKS = '[Book] Load Books',
    LOAD_BOOKS_SUCCESS = '[Book] Load Books Success',
    LOAD_BOOKS_FAIL = '[Book] Load Books Fail',

    CREATE_BOOK = '[Book] Create Book',
    CREATE_BOOK_SUCCESS = '[Book] Create Book Success',
    CREATE_BOOK_FAIL = '[Book] Create Book Fail',

    VIEW_BOOK = '[Book] View Book',
    VIEW_BOOK_SUCCESS = '[Book] View Book Success',
    VIEW_BOOK_FAIL = '[Book] View Book Fail',

    DELETE_BOOK = '[Book] Delete Book',
    DELETE_BOOK_SUCCESS = '[Book] Delete Book Success',
    DELETE_BOOK_FAIL = '[Book] Delete Book Fail'
}

export const loadBooks = createAction(
    BookActionTypes.LOAD_BOOKS
);

export const loadBooksSuccess = createAction(
    BookActionTypes.LOAD_BOOKS_SUCCESS,
    props<{ payload: Book[] }>()
);

export const loadBooksFailure = createAction(
    BookActionTypes.LOAD_BOOKS_FAIL,
    props<Error>()
);

export const createBook = createAction(
    BookActionTypes.CREATE_BOOK,
    props<{payload: Book}>()
);

export const createBookSuccess = createAction(
    BookActionTypes.CREATE_BOOK_SUCCESS
);

export const createBookFailure = createAction(
    BookActionTypes.CREATE_BOOK_FAIL,
    props<Error>()
);

export const viewBook = createAction(
    BookActionTypes.VIEW_BOOK,
    props<{payload: String}>()
);

export const viewBookSuccess = createAction(
    BookActionTypes.VIEW_BOOK_SUCCESS,
    props<{payload: Book}>()
);

export const viewBookFailure = createAction(
    BookActionTypes.VIEW_BOOK_FAIL,
    props<Error>()
);

export const deleteBook = createAction(
    BookActionTypes.DELETE_BOOK,
    props<{payload: string}>()
);

export const deleteBookSuccess = createAction(
    BookActionTypes.DELETE_BOOK_SUCCESS,
);

export const deleteBookFailure = createAction(
    BookActionTypes.DELETE_BOOK_FAIL,
    props<Error>()
);

