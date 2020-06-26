import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { Router } from '@angular/router';
import { EmployeeHealth } from "../employeeHealth";
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-employee-health',
  templateUrl: './employee-health.component.html',
  styleUrls: ['./employee-health.component.sass']
})
export class EmployeeHealthComponent implements OnInit {
  employees: Observable<EmployeeHealth[]>;
  role: any;
  disable:boolean
  message:string;

  constructor(
    private employeeService: EmployeeService,
     private router: Router,
     private alertService: AlertService
     ) { }

  ngOnInit() {
    this.reloadData();
    this.disable = false;
    this.message = "";
  }
  sendReport() {
    this.disable = true;
    this.employeeService.sendMail()
    .subscribe(
      data => {
        this.message = data.response;
        this.alertService.success(data.response);
      },
      (error:HttpErrorResponse) => {
          this.disable = false;
          this.alertService.error(error.error.message);
          console.log(error.error);
      }
    );
  }
  reloadData() {
    this.employees  = this.employeeService.getEmployeesHealthStattus();
    //console.log(this.employees);
    this.employeeService.getProfilerole()
    .subscribe( role => {console.log(role.profile_role); this.role = role.profile_role})
  }


}
