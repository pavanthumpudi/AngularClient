import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.sass']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  employees: Observable<Employee[]>;
  submitted = false;
  message: any;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    //this.employees = this.employeeService.getEmployeesList();
    //this.employeeService.refreshneeded$
    //.subscribe(() => {
    //  this.employees = this.employeeService.getEmployeesList();
    //});
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(
        data => {
          console.log(data);
          //this.employees = this.employeeService.getEmployeesList();
          this.gotoList();
        }, error => {
          this.message = error.message;
          console.log(error);
        }
       
      );
    
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}