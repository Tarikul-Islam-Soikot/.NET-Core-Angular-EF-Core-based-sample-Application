import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemoPickerComponent } from './demo-picker.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:
  [
    DemoPickerComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonsModule,
    ModalModule.forRoot(),
  ],
  exports: [
    RouterModule,
    DemoPickerComponent,
  ]
})
export class PickerModule { }
