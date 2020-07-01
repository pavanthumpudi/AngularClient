import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  employee: Employee = new Employee();
  err_message: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    
  }
  login() {
    this.auth.login(this.employee)
    .subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.id);
        this.gotoList();
      },
      (error:HttpErrorResponse) => {
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
