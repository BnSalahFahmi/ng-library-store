import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromLibrary from './../../reducers/library.reducer';
import * as libraryActions from './../../actions/library.actions';
import { Library, initLibrabry } from '../../models/library.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Observable } from 'rxjs';
import { selectLoading, selectErrorMessage } from '../../selectors/library.selectors';

@Component({
  selector: 'app-library-create',
  templateUrl: './library-create.component.html',
  styleUrls: ['./library-create.component.scss']
})
export class LibraryCreateComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  library: Library = initLibrabry();

  constructor(private store: Store<fromLibrary.State>) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectErrorMessage);
  }

  ngOnInit() {
  }

  handleSaveClick() {
    this.store.dispatch(libraryActions.createLibrary({library: this.library}));
  }

  handleResetClick() {
    this.library = initLibrabry();
  }

}
