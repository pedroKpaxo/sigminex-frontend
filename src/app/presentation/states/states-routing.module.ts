import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from 'leaflet';
import { StateslistComponent } from './stateslist/stateslist.component';

const routes: Routes = [
  {
    path: 'list',
    component: StateslistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }
