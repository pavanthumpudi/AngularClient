import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8080';
  _refreshneeded$: any;
  authToken: any;
  user: any;
  constructor( private http:HttpClient, private router:Router ) { }

  login(employee: Employee): Observable<any> {
    const data = new FormData();
    data.append("emailId", employee.emailId);
    data.append("password", employee.password);
    return this.http.post<JSON>(`${this.baseUrl}/api/login.php`,  data);
  }
  
  

  createEmployee(employee: Employee): Observable<any> {
    //console.log(employee);
    const data = new FormData();
    data.append("firstName", employee.firstName);
    data.append("lastName", employee.lastName);
    data.append("emailId", employee.emailId);
    data.append("password", employee.password);
    return this.http.post<JSON>(`${this.baseUrl}/api/create.php`,  data)
    .pipe(
      tap(() => {
        this._refreshneeded$.next();
      }) 
    )
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate[
      '/login'
    ]
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserId() {
    return localStorage.getItem('user_id');
  }
  /* blog services starts */
  blogregister(user): Observable<any>{
    return this.http.post(`${this.baseUrl}/authentication/register`, user);
  }
  // Function to check if username is taken
  checkUsername(username): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/checkUsername/` + username);
  }

  // Function to check if e-mail is taken
  checkEmail(email) : Observable<any>{
    return this.http.get(`${this.baseUrl}/authentication/checkEmail/` + email);
  }
  bloglogin(user): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication/login`, user);
  }
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  getProfile(): Observable<any>  {
    return this.http.get(`${this.baseUrl}/authentication/profile`);
  }
}
