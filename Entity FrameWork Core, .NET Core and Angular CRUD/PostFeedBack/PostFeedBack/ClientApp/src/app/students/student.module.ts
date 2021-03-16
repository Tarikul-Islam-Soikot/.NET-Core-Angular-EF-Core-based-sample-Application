import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentRoutingModule } from './student.routing.module';
import { StudentListComponent } from './studentList.component';
import { StudentComponent } from './student.component';

@NgModule({
  declarations:
  [
    StudentListComponent,
    StudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class StudentModule { }
