import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { Observable } from "rxjs";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.sass"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;
  role:any;
  skill:any;
  constructor(private employeeService: EmployeeService,
    private router: Router) {}

  ngOnInit() {
    //this.employeeService.refreshneeded$
    //.subscribe(() => {
    //  this.reloadData();
    //})
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
    this.employeeService.getProfilerole()
    .subscribe( role => {console.log(role.profile_role); this.role = role.profile_role})
    //console.log(this.role);
  }

  onSubmit() {
    this.employees = this.employeeService.getEmployeesListBySkill(this.skill);
    console.log(this.employees);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  editDetails(id: number) {
    this.router.navigate(['update', id]);
  }

  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
}