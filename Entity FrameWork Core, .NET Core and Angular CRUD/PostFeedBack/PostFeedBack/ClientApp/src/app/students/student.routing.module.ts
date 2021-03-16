import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './studentList.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Student'
    },
    children: [
      {
        path: 'studentList',
        component: StudentListComponent,
        data: {
          title: 'Student List'
        }
      },
      {
        path: 'student',
        component: StudentComponent,
        data: {
          title: 'Add Student'
        }
      },
      {
        path: 'student/:id',
        component: StudentComponent,
        data: {
          title: 'Edit Student'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
