import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromBook from './../../reducers/book.reducer';
import { BookCreateComponent } from './book-create.component';
import { Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { createBook, loadBooks } from '../../actions/book.actions';
import { initBook } from '../../models/Book.model';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let actions: Observable<any>;
  let store: jasmine.SpyObj<Store<fromBook.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [

      ],
      providers: [
        provideMockActions(() => actions),
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch', 'select'])
        }
      ]
    })
      .compileComponents();

    store = TestBed.get('Store');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send load books action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadBooks({}));
  });

  it('should send create book action when book credentiels not empty ', () => {
    // Given
    const book = {
      id: 'some_id',
      name: 'some_name',
      description: 'some_description',
      urlPhoto: 'some_url_photo',
      libraries: []
    };
    component.book = book;

    // When
    component.handleSaveClick();

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(createBook(book));
  });

  it('should reset book when reset click', () => {
    // Given
    component.book = {
      id: 'some_id',
      name: 'some_name',
      description: 'some_description',
      urlPhoto: 'some_url_photo',
      libraries: []
    };

    // When
    component.handleResetClick();

    // Then
    expect(component.book).toEqual(initBook());
  });
});
