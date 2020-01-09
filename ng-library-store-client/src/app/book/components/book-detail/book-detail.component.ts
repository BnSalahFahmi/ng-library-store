import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Book } from '../../models/Book.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromBook from '../../reducers/book.reducer';
import * as bookActions from '../../actions/book.actions';
import { ActivatedRoute } from '@angular/router';
import { selectLoading, selectSelectedBook } from '../../selectors/book.selectors';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, AfterViewInit {

  selectedBook$: Observable<Book>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromBook.State>, private route: ActivatedRoute) {
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(bookActions.viewBook({ payload: params['id'] }));
    })
  }

  ngAfterViewInit() {
    this.selectedBook$ = this.store.select(selectSelectedBook);
  }

}
