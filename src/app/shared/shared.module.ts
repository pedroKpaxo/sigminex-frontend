import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecordModalComponent } from './components/record-modal/record-modal.component';


@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    RecordModalComponent
  ],
  exports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
  ],
})
export class SharedModule { }
