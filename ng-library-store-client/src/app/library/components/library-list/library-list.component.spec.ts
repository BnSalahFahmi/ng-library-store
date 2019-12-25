import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import * as fromLibrary from './../../reducers/library.reducer';
import { LibraryListComponent } from './library-list.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideMockActions } from '@ngrx/effects/testing';
import { loadLibraries, deleteLibrary } from '../../actions/library.actions';
import { Library } from '../../models/library.model';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LibraryListComponent', () => {
  let component: LibraryListComponent;
  let fixture: ComponentFixture<LibraryListComponent>;
  let actions: Observable<any>;
  let store: SpyObj<Store<fromLibrary.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryListComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        SharedModule
      ],
      providers: [
        provideMockActions(() => actions),
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', ['dispatch', 'select'])
        }
      ]
    })
      .compileComponents();

    store = TestBed.get(Store);

    const libraries: Library[] = [
      {
        id: 'some_id_1',
        name: 'some_name_1',
        address: 'some_address_1'
      },
      {
        id: 'some_id_2',
        name: 'some_name_2',
        address: 'some_address_2'
      }
    ];

    store.select.and.returnValue(of(libraries));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send load libraries action when init', () => {
    // Given

    // When
    component.ngOnInit();

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(loadLibraries({}));
  });

  it('should send delete library when delete click', () => {
    // Given
    const library: Library = {
      id: 'some_id',
      name: 'some_name',
      address: 'some_address'
    };

    // When
    component.handleDeleteClick(library);

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(deleteLibrary({ libraryId: library.id }));
  });
});
