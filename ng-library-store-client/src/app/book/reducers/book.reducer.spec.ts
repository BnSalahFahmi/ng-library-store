import { Book } from '../models/Book.model';
import { reducer, initialState } from './book.reducer';
import {
  createBook,
  createBookFailure,
  createBookSuccess,
  deleteBook,
  deleteBookFailure,
  deleteBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess
} from '../actions/book.actions';

describe('Book reducer', () => {

  const book: Book = {
    id: 'ea26fc19-7fc8-467c-8baf-c8128d0cf1ea',
    name: 'Test Driven Development',
    description: 'Follows two TDD projects, illustrating techniques programmers can use to increase the quality of their work',
    author: 'Kent Beck',
    urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg',
    creationDate: new Date('10-10-2012'),
    libraries: []
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[Book] Load Books', () => {
    it('should toggle loading state', () => {
      const action = loadBooks();
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Book] Load Books Success', () => {
    it('should add all books to state', () => {
      const books = [ book ];
      const action = loadBooksSuccess({ books });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: books.reduce(
          (entityMap, b) => ({
            ...entityMap,
            [b.id]: b
          }),
          {}
        ),
        ids: books.map(b => b.id),
        isLoading: false
      });
    });
  });

  describe('[Book] Load Books Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = loadBooksFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

  describe('[Book] Create Book', () => {
    it('should toggle loading state', () => {
      const action = createBook({ book })
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Book] Create Book Success', () => {
    it('should add a book to state', () => {
      const action = createBookSuccess({ book });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        entities: {
          [book.id]: book
        },
        ids: [book.id],
        isLoading: false
      });
    });
  });

  describe('[Book] Create Book Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = createBookFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

  describe('[Book] Delete Book', () => {
    it('should toggle loading state', () => {
      const action = deleteBook({ bookId: book.id })
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  describe('[Book] Delete Book Success', () => {
    it('should delete a book from state', () => {

      const firstBook: Book = {
        id: '0f2a1618-f90d-4c13-9412-63a26c98747e',
        name: 'Code Complete: A Practical Handbook of Software Construction',
        description: 'Widely considered one of the best practical guides to programming',
        author: 'Steve McConnell',
        urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/514Fchkr9WL._AC_SX368_.jpg',
        creationDate: new Date('10-12-2019'),
        libraries: []
      };

      const secondBook: Book = {
        id: 'a18fa48f-62ce-4157-89af-075d794cfe31',
        name: 'Release It!: Design and Deploy Production-Ready Software',
        description: 'A single dramatic software failure can cost a company millions of dollars',
        author: 'Michael Nygard',
        urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/711kreNLLNL._AC_SX368_.jpg',
        creationDate: new Date('10-12-2019'),
        libraries: []
      };

      const action1 = createBookSuccess({ book: firstBook });
      const state = reducer(initialState, action1);

      const action2 = createBookSuccess({ book: secondBook });
      const newState = reducer(state, action2);

      const action = deleteBookSuccess({ bookId: firstBook.id });
      const result = reducer(newState, action);

      expect(result).toEqual({
        ...newState,
        entities: {
          [secondBook.id]: secondBook
        },
        ids: [secondBook.id],
        isLoading: false
      });
    });
  });

  describe('[Book] Delete Book Fail', () => {
    it('should update error in state', () => {
      const error = new Error();
      const action = deleteBookFailure({ error });
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isLoading: false
      });
    });
  });

})
