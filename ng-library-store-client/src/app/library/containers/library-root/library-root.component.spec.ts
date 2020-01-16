import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromLibrary from './../../reducers/library.reducer';
import { LibraryRootComponent } from './library-root.component';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { selectLoading, selectErrorMessage } from '../../selectors/library.selectors';
import { LibraryListComponent } from '../../components/library-list/library-list.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';

describe('LibraryRootComponent', () => {
  let component: LibraryRootComponent;
  let fixture: ComponentFixture<LibraryRootComponent>;
  let store: jasmine.SpyObj<Store<fromLibrary.State>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryRootComponent, LibraryListComponent ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch', 'select'])
        }
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    store.select.and.returnValue(of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve loading on init', () => {
    expect(store.select).toHaveBeenCalledWith(selectLoading);
  });

  it('should retrieve error message on init', () => {
    expect(store.select).toHaveBeenCalledWith(selectErrorMessage);
  });

});
