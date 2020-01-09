import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromBooks from '../../reducers/book.reducer';
import { BookGridComponent } from './book-grid.component';
import { Store } from '@ngrx/store';
import { Book } from '../../models/Book.model';

describe('BookGridComponent', () => {
  let component: BookGridComponent;
  let fixture: ComponentFixture<BookGridComponent>;
  let store: jasmine.SpyObj<Store<fromBooks.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookGridComponent ],
      imports: [

      ],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dspatch', 'select'])
        }
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select books on init', () => {
    expect(component).toBeTruthy();
  });

  it('should reset book on delete click', () => {
    // Given
    const book : Book = {
      
    };

    // When
    component.handleDeleteClick();

    // Then
  });
});
