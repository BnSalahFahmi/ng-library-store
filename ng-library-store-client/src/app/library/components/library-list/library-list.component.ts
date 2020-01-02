import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as fromLibrary from './../../reducers/library.reducer';
import * as libraryActions from './../../actions/library.actions';
import { Library } from '../../models/library.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectLibraries } from '../../selectors/library.selectors';

@Component({
  selector: 'library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit, OnDestroy {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  displayedColumns: string[] = ['name', 'address', 'actions'];
  dataSource = new MatTableDataSource([]);
  libraries: Library[] = [];
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.store.dispatch(libraryActions.loadLibraries());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.subscriptions.push(this.store.select(selectLibraries).subscribe(
      data => {
        this.libraries = data;
        this.dataSource = new MatTableDataSource(data);
      }
    ));
  }

  handleDeleteClick(library: Library) {
    this.store.dispatch(libraryActions.deleteLibrary({ libraryId: library.id }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }

}
