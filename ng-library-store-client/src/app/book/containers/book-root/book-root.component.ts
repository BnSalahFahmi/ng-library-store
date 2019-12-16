import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectLoading, selectErrorMessage } from '../../selectors/book.selectors';
import * as fromBook from './../../reducers/book.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-root',
  templateUrl: './book-root.component.html',
  styleUrls: ['./book-root.component.scss']
})
export class BookRootComponent implements OnInit {

  private toggle = true;
  private loading$: Observable<boolean>;
  private error$: Observable<string>;

  constructor(private store: Store<fromBook.State>) { }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectErrorMessage);
  }

}
