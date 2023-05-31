import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent},
  { path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } ,
  { path: "project/new", component: ProjectFormComponent, canActivate:[AuthGuard]},
  { path: "project/:id/edit", component: ProjectFormComponent, canActivate:[AuthGuard]},
  { path: "project/:id", component:ProjectDetailsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
