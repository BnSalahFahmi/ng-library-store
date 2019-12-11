import { Component, OnInit } from '@angular/core';
import * as fromLibrary from './../../reducers/library.reducer';
import { Library } from '../../models/library.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Store } from '@ngrx/store';
import { selectLibraries } from '../../selectors/library.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'library-grid',
  templateUrl: './library-grid.component.html',
  styleUrls: ['./library-grid.component.scss']
})
export class LibraryGridComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  libraries$: Observable<Library[]>;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.libraries$ = this.store.select(selectLibraries);
  }

  handleDeleteClick(library: Library) {
    // TODO
  }

  handleDeleteSelectedClick() {
    // TODO
  }

}
