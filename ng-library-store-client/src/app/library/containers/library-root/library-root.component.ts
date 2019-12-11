import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import * as fromLibrary from './../../reducers/library.reducer';
import * as libraryActions from './../../actions/library.actions';
import { Observable } from 'rxjs';
import { selectErrorMessage, selectLibraries, selectLoading } from '../../selectors/library.selectors';

@Component({
  selector: 'app-library-root',
  templateUrl: './library-root.component.html',
  styleUrls: ['./library-root.component.scss']
})
export class LibraryRootComponent implements OnInit {
  
  private toggle = true;
  private loading$: Observable<boolean>;
  private error$: Observable<string>;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectErrorMessage);
  }

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }

}
