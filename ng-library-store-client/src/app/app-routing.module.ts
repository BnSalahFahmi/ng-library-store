import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: '', redirectTo: 'library', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
