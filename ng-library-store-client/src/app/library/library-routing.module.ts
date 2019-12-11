import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryCreateComponent } from './components/library-create/library-create.component';
import { LibraryDetailComponent } from './components/library-detail/library-detail.component';
import { LibraryRootComponent } from './containers/library-root/library-root.component';

const routes: Routes = [
  { path: 'list', component: LibraryRootComponent},
  { path: 'create', component: LibraryCreateComponent},
  { path: 'detail', component: LibraryDetailComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
