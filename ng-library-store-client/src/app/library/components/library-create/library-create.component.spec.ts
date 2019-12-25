import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { LibraryCreateComponent } from './library-create.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import SpyObj = jasmine.SpyObj;
import * as fromLibrary from './../../reducers/library.reducer';
import { createLibrary } from '../../actions/library.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { initLibrabry } from '../../models/library.model';

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
    component.library = {
      id: 'some_id',
      name: 'some_name',
      address: 'some_address'
    };

    // When
    component.handleSaveClick();

    // Then
    expect(store.dispatch).toHaveBeenCalledWith(createLibrary(component.library));
  });

  it('should reset library when reset click', () => {
    // Given
    component.library = {
      id: 'some_id',
      name: 'some_name',
      address: 'some_address'
    };

    // When
    component.handleResetClick();

    // Then
    expect(component.library).toEqual(initLibrabry());
  });

});
