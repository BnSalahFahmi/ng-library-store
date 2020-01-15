import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/Book.model';
import { Store } from '@ngrx/store';
import * as fromBook from '../../reducers/book.reducer';
import * as bookActions from '../../actions/book.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;

  constructor(private store: Store<fromBook.State>, private router: Router) { }

  ngOnInit() {
  }

  handleViewClick(book: Book) {
    this.router.navigate(['/book/list/' + book.id]);
  }

  handleDeleteClick(book: Book) {
    this.store.dispatch(bookActions.deleteBook({ bookId: book.id }));
  }

}
