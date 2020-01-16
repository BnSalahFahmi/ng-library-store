import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookItemComponent } from './book-item.component';
import { Store } from '@ngrx/store';
import * as fromBook from '../../reducers/book.reducer';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Book } from '../../models/Book.model';
import SpyObj = jasmine.SpyObj;



describe('BookItemComponent', () => {
  let component: BookItemComponent;
  let fixture: ComponentFixture<BookItemComponent>;
  let store: SpyObj<Store<fromBook.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookItemComponent ],
      imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([])
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
