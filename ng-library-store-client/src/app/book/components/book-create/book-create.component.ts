import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Book, initBook } from '../../models/Book.model';
import { selectLoading, selectErrorMessage } from '../../selectors/book.selectors';
import * as fromBook from '../../reducers/book.reducer';
import * as bookActions from '../../actions/book.actions';
import { Library } from 'src/app/library/models/library.model';
import { selectLibraries } from 'src/app/library/selectors/library.selectors';
import * as libraryActions from './../../../library/actions/library.actions';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit, OnDestroy {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  filteredLibraries: ReplaySubject<Library[]> = new ReplaySubject<Library[]>(1);
  onDestroy$ = new Subject<void>();
  libraryCtrl: FormControl = new FormControl();
  librariesFilter: FormControl = new FormControl();
  book: Book = initBook();
  libraries$: Observable<Library[]>;
  libraries: Library[] = [];
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBook.State>) {}

  ngOnInit() {
    this.store.dispatch(libraryActions.loadLibraries());

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectErrorMessage);

    this.store.select(selectLibraries).subscribe(
      data => {
        this.libraries = data;
      }
    );

    this.filteredLibraries.next(this.libraries.slice());

    this.librariesFilter.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.filterLibraries();
      });
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredLibraries.pipe(take(1), takeUntil(this.onDestroy$))
      .subscribe(val => {
        if (selectAllValue) {
          this.libraryCtrl.patchValue(val);
        } else {
          this.libraryCtrl.patchValue([]);
        }
      });
  }

  protected filterLibraries() {
    let search = this.librariesFilter.value;
    if (!search) {
      this.filteredLibraries.next(this.libraries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredLibraries.next(
      this.libraries.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  handleSaveClick() {
    this.libraryCtrl.value.forEach(element => {
      this.book.libraries.push(element);
    });
    this.book.creationDate = new Date();
    this.store.dispatch(bookActions.createBook({book: this.book}));
  }

  handleResetClick() {
    this.book = initBook();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
