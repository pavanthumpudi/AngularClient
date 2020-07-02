
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule ,HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service'
import { EmployeeService } from './employee.service';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CovidCasesComponent } from './covid-cases/covid-cases.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { EmployeeHealthComponent } from './employee-health/employee-health.component';
import { AlertComponent } from './alert/alert.component';
import { BlogLoginComponent } from './blog-login/blog-login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogRegisterComponent } from './blog-register/blog-register.component';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogProfileComponent } from './blog-profile/blog-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BarChartComponent,
    CovidCasesComponent,
    ChecklistComponent,
    EmployeeHealthComponent,
    AlertComponent,
    BlogLoginComponent,
    BlogComponent,
    BlogRegisterComponent,
    EditBlogComponent,
    BlogProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    ChartsModule,
    Nl2BrPipeModule
  ],
  providers: [AuthGuard, AuthService, EmployeeService,  FormBuilder,
    {
      provide:HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
