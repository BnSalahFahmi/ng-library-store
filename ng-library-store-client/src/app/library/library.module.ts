import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LibraryCreateComponent } from './components/library-create/library-create.component';
import { LibraryDetailComponent } from './components/library-detail/library-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LibraryService } from './services/library.service';
import { LibraryEffects } from './effects/library.effects';
import { reducer } from './reducers/library.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { LibraryRootComponent } from './containers/library-root/library-root.component';

@NgModule({
  declarations: [
    LibraryCreateComponent,
    LibraryDetailComponent,
    LibraryListComponent,
    LibraryRootComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LibraryRoutingModule,
    StoreModule.forFeature('Library', reducer),
    EffectsModule.forFeature([LibraryEffects])
  ],
  exports: [
    LibraryCreateComponent,
    LibraryDetailComponent,
    LibraryListComponent,
    LibraryRootComponent
  ],
  providers: [
    LibraryService
  ]
})
export class LibraryModule { }
