import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading/loading.component';
import { ModuleWithProviders } from '@angular/core';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: LoadingComponent,
    },
    {
        path: 'student',
        loadChildren: './student/student.module#StudentModule'
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
