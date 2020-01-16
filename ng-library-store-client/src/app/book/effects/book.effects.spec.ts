import { BookEffects } from './book.effects';
import { Observable, of } from 'rxjs';
import { BookService } from '../services/Book.service';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  createBook,
  createBookSuccess,
  deleteBook,
  deleteBookSuccess,
  createBookFailure,
  loadBooks
} from '../actions/book.actions';
import { Book } from '../models/Book.model';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';

fdescribe('Book effects scenarios', () => {

  let bookEffects: BookEffects;
  let actions: Observable<any>;
  let bookService: jasmine.SpyObj<BookService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: Router;

  beforeEach(() => {
    const store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    store.select.and.returnValue(of(book));
    bookService = jasmine.createSpyObj('BookService', ['createBook', 'deleteBook', 'fetchBooks']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        BookEffects,
        provideMockActions(() => actions),
        {
          provide: Store,
          useValue: store
        },
        {
          provide: BookService,
          useValue: bookService
        },
        {
          provide: ToastrService,
          useValue: toastrService
        }
      ]
    });

    bookEffects = TestBed.get(BookEffects);
    router = TestBed.get(Router);
  });

  const book: Book = {
    id: 'ea26fc19-7fc8-467c-8baf-c8128d0cf1ea',
    name: 'Test Driven Development',
    description: 'Follows two TDD projects, illustrating techniques programmers can use to increase the quality of their work',
    author: 'Kent Beck',
    urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg',
    creationDate: new Date('10-10-2012'),
    libraries: []
  };

  it('should handle book addition', () => {
    // Given
    bookService.createBook.and.returnValue(cold('-a', { a: book }));

    // When
    actions = hot('-a', {a : createBook({ book })});

    // Then
    const expected = cold('--b', {b : createBookSuccess({ book })});
    expect(bookEffects.CreateBookEffect$).toBeObservable(expected);
  });

  it('should return a book.createBookFailure if the book service throws', () => {
    // Given
    bookService.createBook.and.returnValue(cold('-#|'));

    // When
    actions = hot('-a', {a : createBook({ book })});

    // Then
    const error = new Error();
    const expected = cold('--b', {b : createBookFailure({ error })});
    expect(bookEffects.CreateBookEffect$).toBeObservable(expected);
  });

  it('should reload when after book addition', () => {
    // When
    actions = hot('--a', {a : deleteBook({ bookId: book.id })});

    // Then
    const navigateSpy = spyOn(router, 'navigate');
    expect(navigateSpy).toHaveBeenCalledWith(['/library/list']);
    expect(toastrService.success).toHaveBeenCalledWith('Book Saved Successfully');
  });

  it('should handle book deletion', () => {
    // Given
    bookService.deleteLBook.and.returnValue(cold('-a', { a: book.id }));

    // When
    actions = hot('-a', {a : deleteBook({ bookId: book.id })});

    // Then
    const expected = cold('--b', {b : deleteBookSuccess({ bookId: book.id })});
    expect(bookEffects.DeleteBookEffect$).toBeObservable(expected);
  });
});
