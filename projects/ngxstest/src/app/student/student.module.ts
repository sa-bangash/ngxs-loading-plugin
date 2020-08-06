import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { NgxsLoadingPluginModule } from 'projects/ngxs-loading-plugin/src/public-api';



@NgModule({
  declarations: [StudentListComponent],
  imports: [
    CommonModule,
    NgxsLoadingPluginModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: StudentListComponent,
      },
    ])
  ]
})
export class StudentModule { }
