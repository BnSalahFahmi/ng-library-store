import { Component, OnInit } from '@angular/core';
import * as fromBook from './../../reducers/book.reducer';
import { Book } from '../../models/book.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from 'src/app/shared/animations/route.animations';
import { Store } from '@ngrx/store';
import { selectBooks } from '../../selectors/book.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'book-grid',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-grid.component.scss']
})
export class BookGridComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  books$: Observable<Book[]>;

  constructor(private store: Store<fromBook.State>) { }

  ngOnInit() {
    this.books$ = this.store.select(selectBooks);
  }

  handleViewClick(book: Book) {

  }

  handleDeleteClick(book: Book) {
    // TODO
  }

}
