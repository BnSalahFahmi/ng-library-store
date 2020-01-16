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
        id: '4e54fbb5-ef31-4893-b784-3b5048d72407',
        name: 'BNF Richelieu Site',
        address: '58 Rue de Richelieu, 75002 Paris',
        creationDate: new Date('01-04-2010')
      },
      {
        id: 'a189da17-deb0-4854-a037-b62ae4b9b699',
        name: 'Library Forney',
        address: '1 Rue du Figuier, 75004 Paris',
        creationDate: new Date('05-12-2013')
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
    expect(store.dispatch).toHaveBeenCalledWith(loadLibraries());
  });

  it('should send delete library when delete click', () => {
    // Given
    const library: Library = {
      id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
      name: 'Cabinet des Médailles Paris',
      address: '75004 Paris',
      creationDate: new Date('10-12-2015')
    };

    // When
    component.handleDeleteClick(library);

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(deleteLibrary({ libraryId: library.id }));
  });
});
