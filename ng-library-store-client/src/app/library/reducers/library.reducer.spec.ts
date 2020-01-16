import { Library } from '../models/library.model';
import { reducer, initialState } from './library.reducer';
import {
  createLibrary,
  createLibraryFailure,
  createLibrarySuccess,
  deleteLibrary,
  deleteLibraryFailure,
  deleteLibrarySuccess,
  loadLibraries,
  loadLibrariesFailure,
  loadLibrariesSuccess
} from '../actions/library.actions';

describe('Library reducer', () => {

  const library: Library = {
    id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
    name: 'Cabinet des Médailles Paris',
    address: '75004 Paris',
    creationDate: new Date('10-12-2015')
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[Library] Load Libraries', () => {
    it('should toggle loading state', () => {
      const action = loadLibraries();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Library] Load Libraries Success', () => {
    it('should add all libraries to state', () => {
      const libraries = [ library ];
      const action = loadLibrariesSuccess({ libraries });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: libraries.reduce(
          (entityMap, lib) => ({
            ...entityMap,
            [lib.id]: lib
          }),
          {}
        ),
        ids: libraries.map(lib => lib.id),
        isLoading: false
      });
    });
  });

  describe('[Library] Load Libraries Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = loadLibrariesFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

  describe('[Library] Create Library', () => {
    it('should toggle loading state', () => {
      const action = createLibrary({ library })
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Library] Create Library Success', () => {
    it('should add a library to state', () => {
      const action = createLibrarySuccess({ library });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: {
          [library.id]: library
        },
        ids: [library.id],
        isLoading: false
      });
    });
  });

  describe('[Library] Create Library Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = createLibraryFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

  describe('[Library] Delete Library', () => {
    it('should toggle loading state', () => {
      const action = deleteLibrary({ libraryId: library.id })
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Library] Delete Library Success', () => {
    it('should delete a library from state', () => {

      const firstLibrary: Library = {
        id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
        name: 'Cabinet des Médailles Paris',
        address: '75004 Paris',
        creationDate: new Date('10-12-2015')
      };

      const secondLibrary: Library = {
        id: '8b3c4570-ca60-4b9d-89bc-6abccc62a607',
        name: 'Cabinet des Médailles Paris',
        address: '75004 Paris',
        creationDate: new Date('10-12-2015')
      };

      const action1 = createLibrarySuccess({ library: firstLibrary });
      const state = reducer(initialState, action1);

      const action2 = createLibrarySuccess({ library: secondLibrary });
      const newState = reducer(state, action2);

      const action = deleteLibrarySuccess({ libraryId: firstLibrary.id });
      const result = reducer(newState, action);

      expect(result).toEqual({
        ...newState,
        entities: {
          [secondLibrary.id]: secondLibrary
        },
        ids: [secondLibrary.id],
        isLoading: false
      });
    });
  });

  describe('[Library] Delete Library Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = deleteLibraryFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

})
