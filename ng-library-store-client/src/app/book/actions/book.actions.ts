import { createAction, props } from '@ngrx/store';
import { Book } from '../models/Book.model';

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


