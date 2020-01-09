import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookEffects } from './effects/book.effects';
import { reducer } from './reducers/book.reducer';
import { BookService } from './services/Book.service';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookGridComponent } from './containers/book-grid/book-grid.component';
import { BookRootComponent } from './containers/book-root/book-root.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookItemComponent } from './components/book-item/book-item.component';

@NgModule({
  declarations: [
    BookCreateComponent,
    BookGridComponent,
    BookRootComponent,
    BookDetailComponent,
    BookItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    BookRoutingModule,
    NgxMatSelectSearchModule,
    StoreModule.forFeature('Book', reducer),
    EffectsModule.forFeature([BookEffects])
  ],
  exports: [
    BookCreateComponent,
    BookGridComponent,
    BookRootComponent
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
