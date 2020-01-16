import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromBook from './../../reducers/book.reducer';
import { BookCreateComponent } from './book-create.component';
import {Store, StoreModule} from '@ngrx/store';
import { createBook, loadBooks } from '../../actions/book.actions';
import { Book, initBook } from '../../models/Book.model';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadLibraries } from '../../../library/actions/library.actions';
import SpyObj = jasmine.SpyObj;

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;
  let store: SpyObj<Store<fromBook.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookCreateComponent],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMatSelectSearchModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', ['dispatch', 'select'])
        }
      ]
    })
      .compileComponents();

    store = TestBed.get(Store);

    const books: Book[] = [
      {
        id: '0f2a1618-f90d-4c13-9412-63a26c98747e',
        name: 'Code Complete: A Practical Handbook of Software Construction',
        description: 'Widely considered one of the best practical guides to programming',
        author: 'Steve McConnell',
        urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/514Fchkr9WL._AC_SX368_.jpg',
        creationDate: new Date('10-12-2019'),
        libraries: []
      },
      {
        id: 'a18fa48f-62ce-4157-89af-075d794cfe31',
        name: 'Release It!: Design and Deploy Production-Ready Software',
        description: 'A single dramatic software failure can cost a company millions of dollars',
        author: 'Michael Nygard',
        urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/711kreNLLNL._AC_SX368_.jpg',
        creationDate: new Date('10-12-2019'),
        libraries: []
      }
    ];

    store.select.and.returnValue(of(books));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send load libraries action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadLibraries());
  });

  it('should send create book action when book credentiels not empty ', () => {
    // Given
    const book: Book = {
      id: 'ea26fc19-7fc8-467c-8baf-c8128d0cf1ea',
      name: 'Test Driven Development',
      description: 'Follows two TDD projects, illustrating techniques programmers can use to increase the quality of their work',
      author: 'Kent Beck',
      urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg',
      creationDate: new Date('10-10-2012'),
      libraries: []
    };
    component.book = book;

    // When
    component.handleSaveClick();

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(createBook({ book }));
  });

  it('should reset book when reset click', () => {
    // Given
    const book: Book = {
      id: 'ea26fc19-7fc8-467c-8baf-c8128d0cf1ea',
      name: 'Test Driven Development',
      description: 'Follows two TDD projects, illustrating techniques programmers can use to increase the quality of their work',
      author: 'Kent Beck',
      urlPhoto: 'https://images-na.ssl-images-amazon.com/images/I/41pO5GqNtzL._AC_SX368_.jpg',
      creationDate: new Date('10-10-2012'),
      libraries: []
    };
    component.book = book;

    // When
    component.handleResetClick();

    // Then
    expect(component.book).toEqual(initBook());
  });
});
