import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { LibraryCreateComponent } from './library-create.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromLibrary from './../../reducers/library.reducer';
import { createLibrary } from '../../actions/library.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { initLibrabry, Library } from '../../models/library.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import SpyObj = jasmine.SpyObj;

describe('LibraryCreateComponent', () => {
  let component: LibraryCreateComponent;
  let fixture: ComponentFixture<LibraryCreateComponent>;
  let actions: Observable<any>;
  let store: SpyObj<Store<fromLibrary.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryCreateComponent],
      imports: [
        FormsModule,
        SharedModule,
        BrowserAnimationsModule
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send create library action when library credentials not empty', () => {
    // Given
    const library: Library = {
      id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
      name: 'Cabinet des Médailles Paris',
      address: '75004 Paris',
      creationDate: new Date('10-12-2015')
    };
    component.library = library;

    // When
    component.handleSaveClick();

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(createLibrary({ library: component.library }));
  });

  it('should reset library when reset click', () => {
    // Given
    const library: Library = {
      id: '8b3c4570-ca60-4b9d-89bc-6abccc62a606',
      name: 'Cabinet des Médailles Paris',
      address: '75004 Paris',
      creationDate: new Date('10-12-2015')
    };
    component.library = library;

    // When
    component.handleResetClick();

    // Then
    expect(component.library).toEqual(initLibrabry());
  });

});
