import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State as BookState } from '../reducers/book.reducer';

export const getBookState = createFeatureSelector<BookState>('Book');

export const selectBooks = createSelector(
  getBookState,
  (state: BookState) => state.books
);

export const selectLoading = createSelector(
  getBookState,
  (state: BookState) => state.isLoading
);

export const selectErrorMessage = createSelector(
  getBookState,
  (state: BookState) => state.errorMessage
);
