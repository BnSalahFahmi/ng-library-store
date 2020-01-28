import * as libraryAction from './library.actions';
import { Library } from '../models/library.model';

fdescribe('Library Actions', () => {
  const givenLibrary: Library = {
    id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
    name: 'Cabinet des Médailles Paris',
    address: '75004 Paris',
    creationDate: new Date('10-12-2015')
  };
  const givenError: Error = new Error();

  describe('ActionLoadLibraries', () => {
    it('should create an action', () => {
      const action = libraryAction.loadLibraries();
      expect({ ...action }).toEqual({
        type: libraryAction.loadLibraries.type
      });
    });
  });

  describe('ActionLoadLibrariesSuccess', () => {
    it('should create an action', () => {
      const action = libraryAction.loadLibrariesSuccess({ libraries : [ givenLibrary ] });
      expect({ ...action }).toEqual({
        type: libraryAction.loadLibrariesSuccess.type,
        libraries: [ givenLibrary ]
      });
    });
  });

  describe('ActionLoadLibrariesFailure', () => {
    it('should create an action', () => {
      const action = libraryAction.loadLibrariesFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: libraryAction.loadLibrariesFailure.type,
        error: givenError
      });
    });
  });

  describe('ActionCreateLibrary', () => {
    it('should create an action', () => {
      const action = libraryAction.createLibrary({ library : givenLibrary});
      expect({ ...action }).toEqual({
        type: libraryAction.createLibrary.type,
        library: givenLibrary
      });
    });
  });

  describe('ActionCreateLibrarySuccess', () => {
    it('should create an action', () => {
      const action = libraryAction.createLibrarySuccess({ library : givenLibrary });
      expect({ ...action }).toEqual({
        type: libraryAction.createLibrarySuccess.type,
        library: givenLibrary
      });
    });
  });

  describe('ActionCreateLibraryFailure', () => {
    it('should create an action', () => {
      const action = libraryAction.createLibraryFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: libraryAction.createLibraryFailure.type,
        error: givenError
      });
    });
  });

  describe('ActionDeleteLibrary', () => {
    it('should create an action', () => {
      const action = libraryAction.deleteLibrary({ libraryId : givenLibrary.id});
      expect({ ...action }).toEqual({
        type: libraryAction.deleteLibrary.type,
        libraryId: givenLibrary.id
      });
    });
  });

  describe('ActionDeleteLibrarySuccess', () => {
    it('should create an action', () => {
      const action = libraryAction.deleteLibrarySuccess({ libraryId : givenLibrary.id });
      expect({ ...action }).toEqual({
        type: libraryAction.deleteLibrarySuccess.type,
        libraryId: givenLibrary.id
      });
    });
  });

  describe('ActionDeleteLibraryFailure', () => {
    it('should create an action', () => {
      const action = libraryAction.deleteLibraryFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: libraryAction.deleteLibraryFailure.type,
        error: givenError
      });
    });
  });
});
