import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State as BookState } from '../reducers/book.reducer';

export const getBookState = createFeatureSelector<BookState>('Book');

export const selectBooks = createSelector(
  getBookState,
  (state: BookState) => Object.values(state.entities)
);

export const selectLoading = createSelector(
  getBookState,
  (state: BookState) => state.isLoading
);

export const selectErrorMessage = createSelector(
  getBookState,
  (state: BookState) => state.error
);
