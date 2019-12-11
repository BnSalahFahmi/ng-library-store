import { NgModule } from '@angular/core';
import {MaterialModule} from './ui/material.module';
import { AnimationsService } from './animations/animations.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NotFoundComponent,
    LoaderComponent
  ],
  providers: [
    AnimationsService
  ],
})
export class SharedModule { }
