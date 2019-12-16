import { createAction, props } from '@ngrx/store';
import { Book } from '../models/Book.model';

export const loadBooks = createAction(
    '[Library API] Load Books',
    props<{}>()
);

export const loadBooksSuccess = createAction(
    '[Library API] Load Books Success',
    props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
    '[Library API] Load Books Failure',
    props<{ errorMessage: string }>()
);

export const createBook = createAction(
    '[Book API] Create Book',
    props<Book>()
);

export const createBookSuccess = createAction(
    '[Book API] Create Book Success',
    props<{}>()
);

export const createBookFailure = createAction(
    '[Book API] Create Book Failure',
    props<{ errorMessage: string }>()
);


