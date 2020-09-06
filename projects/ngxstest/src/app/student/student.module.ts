import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './student-list/student-list.component';
import { NgxsLoadingPluginModule } from 'projects/ngxs-loading-plugin/src/public-api';
import { AddStudentComponent } from './add-student/add-student.component';



@NgModule({
  declarations: [StudentListComponent, AddStudentComponent],
  imports: [
    CommonModule,
    NgxsLoadingPluginModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: StudentListComponent,
      },
      {
        path: 'add',
        component: AddStudentComponent,
      }
    ])
  ]
})
export class StudentModule { }
