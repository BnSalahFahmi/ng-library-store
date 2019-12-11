import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as fromLibrary from './../../reducers/library.reducer';
import * as libraryActions from './../../actions/library.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { Library } from '../../models/library.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Store } from '@ngrx/store';
import { selectLibraries } from '../../selectors/library.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  selection = new SelectionModel<Library>(true, []);
  displayedColumns: string[] = ['select', 'name', 'address', 'actions'];
  dataSource = new MatTableDataSource([]);
  libraries$: Observable<Library[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.store.dispatch(libraryActions.loadLibraries({}));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.libraries$ = this.store.select(selectLibraries);
    this.store.select(selectLibraries).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Library): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  handleDeleteClick(library: Library) {
    // TODO
  }

  handleDeleteSelectedClick() {
    // TODO
  }

}
