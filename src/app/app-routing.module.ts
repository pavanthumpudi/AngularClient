import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { LoginComponent } from './login/login.component' 
import { RegisterComponent } from './register/register.component'
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CovidCasesComponent } from './covid-cases/covid-cases.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { EmployeeHealthComponent } from './employee-health/employee-health.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'checklist', pathMatch: 'full' },
  { path: 'fire', component: FirebaseLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate:[AuthGuard] },
  { path: 'chart', component: BarChartComponent, canActivate:[AuthGuard] },
  { path: 'add', component: CreateEmployeeComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: 'covid', component: CovidCasesComponent },
  { path: 'test', component: EmployeeHealthComponent, canActivate:[AuthGuard]  },
  { path: 'checklist', component: ChecklistComponent, canActivate:[AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }