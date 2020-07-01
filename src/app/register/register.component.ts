import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../alert.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  employee: Employee = new Employee();
  message: any;
  err_message: any;
  disabled: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.disabled = false;
  }
  register() {
    this.disabled =true;
    this.alertService.clear();
    this.auth.createEmployee(this.employee)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.id);
        this.gotoList();
      },
      (error:HttpErrorResponse) => {
          this.disabled = false;
          this.err_message = error.error.message;
          this.alertService.error(error.error.message);
          console.log(error.error);
      }
    );
  }
  gotoList() {
    this.router.navigate(['/checklist']);
  }

}
