import { createAction, props } from '@ngrx/store';
import { Book } from '../models/Book.model';

export enum BookActionTypes {
    LoadBooks = '[Book] Load Books',
    LoadBooksSuccess = '[Book] Load Books Success',
    LoadBooksFail = '[Book] Load Books Fail',

    CreateBook = '[Book] CreateBook',
    CreateBookSuccess = '[Book] CreateBook Success',
    CreateBookFail = '[Book] CreateBook Fail',

    DeleteBook = '[Book] Delete Book',
    DeleteBookSuccess = '[Book] Delete Book Success',
    DeleteBookFail = '[Book] Delete Book Fail'
}

export const loadBooks = createAction(
    BookActionTypes.LoadBooks
);

export const loadBooksSuccess = createAction(
    BookActionTypes.LoadBooksSuccess,
    props<{ data: Book[] }>()
);

export const loadBooksFailure = createAction(
    BookActionTypes.LoadBooksFail,
    props<{ error: Error | any }>()
);

export const createBook = createAction(
    BookActionTypes.CreateBook,
    props<{book: Book}>()
);

export const createBookSuccess = createAction(
    BookActionTypes.CreateBookSuccess,
    props<{}>()
);

export const createBookFailure = createAction(
    BookActionTypes.CreateBookFail,
    props<{ error: Error | any }>()
);

export const deleteBook = createAction(
    BookActionTypes.DeleteBook,
    props<{bookId: string}>()
);

export const deleteBookSuccess = createAction(
    BookActionTypes.DeleteBookSuccess,
);

export const deleteBookFailure = createAction(
    BookActionTypes.DeleteBookFail,
    props<{ error: Error | any }>()
);

