import { createSelector, createFeatureSelector } from '@ngrx/store';

import { State as LibraryState } from './../reducers/library.reducer';

export const getLibraryState = createFeatureSelector<LibraryState>('Library');

export const selectLibraries = createSelector(
    getLibraryState,
  (state: LibraryState) => Object.values(state.entities)
);

export const selectLoading = createSelector(
    getLibraryState,
  (state: LibraryState) => state.isLoading
);

export const selectErrorMessage = createSelector(
    getLibraryState,
  (state: LibraryState) => state.error
);
