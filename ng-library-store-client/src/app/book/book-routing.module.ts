import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookRootComponent } from './containers/book-root/book-root.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  { path: 'list', component: BookRootComponent},
  { path: 'list/:id', component: BookDetailComponent},
  { path: 'create', component: BookCreateComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
