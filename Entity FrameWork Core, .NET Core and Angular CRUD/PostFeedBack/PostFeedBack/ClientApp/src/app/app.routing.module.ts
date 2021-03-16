import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService as AuthGuard}  from './auth-guard/auth.guard.service';
import { LoginComponent } from './auth-guard/login.component';

export const routes: Routes = [
  //{
  //  path: '',
  //  component: DashboardComponent,
  //},
  {
    path: '',
    component: LoginComponent,
  },
  //{
  //  path: 'dashboard',
  //  component: DashboardComponent,
  //},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'counter',
    canActivate: [AuthGuard],
    component: CounterComponent,
    data: {
      title: 'Counter'
    },
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: {
      title: 'Home'
    },
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    loadChildren: () => import('./students/student.module').then(m => m.StudentModule)
  },
  {
    path: '',
    redirectTo: '**',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: DashboardComponent
  },


  //Previous version for overview
  //{
  //  path: '',
  //  component: DashboardComponent,
  //  data: {
  //    title: 'Home'
  //  },
  //  children: [
  //    {
  //      path: 'customers',
  //      canActivate: [AuthGuard],
  //      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerDashboardModule)
  //    },
  //    {
  //      path: 'students',
  //      canActivate: [AuthGuard],
  //      loadChildren: () => import('./students/student.module').then(m => m.StudentModule)
  //    },
  //  ]  
  //},


]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    //RouterModule.forRoot(routes,{ enableTracing: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
