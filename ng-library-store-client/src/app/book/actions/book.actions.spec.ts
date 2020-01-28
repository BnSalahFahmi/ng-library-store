import * as bookAction from './book.actions';
import { Book } from '../models/Book.model';

fdescribe('Book Actions', () => {
  const givenBook: Book = {
    id: 'ea26fc19-7fc8-467c-8baf-c8128d0cf1ea',
    name: 'Test Driven Development',
    description: 'Follows two TDD projects, illustrating techniques programmers can use to increase the quality of their work',
    author: 'Kent Beck',
    urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg',
    creationDate: new Date('10-10-2012'),
    libraries: []
  };
  const givenError: Error = new Error();

  describe('ActionLoadBooks', () => {
    it('should create an action', () => {
      const action = bookAction.loadBooks();
      expect({ ...action }).toEqual({
        type: bookAction.loadBooks.type
      });
    });
  });

  describe('ActionLoadBooksSuccess', () => {
    it('should create an action', () => {
      const action = bookAction.loadBooksSuccess({ books : [ givenBook ] });
      expect({ ...action }).toEqual({
        type: bookAction.loadBooksSuccess.type,
        books: [ givenBook ]
      });
    });
  });

  describe('ActionLoadBooksFailure', () => {
    it('should create an action', () => {
      const action = bookAction.loadBooksFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: bookAction.loadBooksFailure.type,
        error: givenError
      });
    });
  });

  describe('ActionCreateBook', () => {
    it('should create an action', () => {
      const action = bookAction.createBook({ book : givenBook});
      expect({ ...action }).toEqual({
        type: bookAction.createBook.type,
        book: givenBook
      });
    });
  });

  describe('ActionCreateBookSuccess', () => {
    it('should create an action', () => {
      const action = bookAction.createBookSuccess({ book : givenBook });
      expect({ ...action }).toEqual({
        type: bookAction.createBookSuccess.type,
        book: givenBook
      });
    });
  });

  describe('ActionCreateBookFailure', () => {
    it('should create an action', () => {
      const action = bookAction.createBookFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: bookAction.createBookFailure.type,
        error: givenError
      });
    });
  });

  describe('ActionViewBook', () => {
    it('should create an action', () => {
      const action = bookAction.viewBook({ bookId : givenBook.id});
      expect({ ...action }).toEqual({
        type: bookAction.viewBook.type,
        bookId: givenBook.id
      });
    });
  });

  describe('ActionViewBookSuccess', () => {
    it('should create an action', () => {
      const action = bookAction.viewBookSuccess({ bookId : givenBook });
      expect({ ...action }).toEqual({
        type: bookAction.viewBookSuccess.type,
        bookId: givenBook
      });
    });
  });

  describe('ActionViewBookFailure', () => {
    it('should create an action', () => {
      const action = bookAction.viewBookFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: bookAction.viewBookFailure.type,
        error: givenError
      });
    });
  });

  describe('ActionDeleteBook', () => {
    it('should create an action', () => {
      const action = bookAction.deleteBook({ bookId : givenBook.id});
      expect({ ...action }).toEqual({
        type: bookAction.deleteBook.type,
        bookId: givenBook.id
      });
    });
  });

  describe('ActionDeleteBookSuccess', () => {
    it('should create an action', () => {
      const action = bookAction.deleteBookSuccess({ bookId : givenBook.id });
      expect({ ...action }).toEqual({
        type: bookAction.deleteBookSuccess.type,
        bookId: givenBook.id
      });
    });
  });

  describe('ActionDeleteBookFailure', () => {
    it('should create an action', () => {
      const action = bookAction.deleteBookFailure({ error: givenError });
      expect({ ...action }).toEqual({
        type: bookAction.deleteBookFailure.type,
        error: givenError
      });
    });
  });
});
