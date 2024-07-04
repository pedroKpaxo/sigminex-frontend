import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

@NgModule({
  declarations: [RootComponent, MainToolbarComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [RootComponent],
  providers: [],
})
export class RootModule { }
