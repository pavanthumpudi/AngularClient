import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from  './employee';
import { tap } from 'rxjs/operators';
import { Checklist } from './checklist';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://127.0.0.1:8080';
  private _refreshneeded$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshneeded$() {
    return this._refreshneeded$;
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getdetal.php?id=${id}`);
  }
  getProfile (): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/profile.php`);
  }
  getProfilerole (): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/profilerole.php`);
  }
  getSkillsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getallskills.php`);
  }
  getSkillsListByName(skillName:string):  Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getallskills.php?name=${skillName}`);
  }
  getEmpSkillsList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getempskills.php?id=${id}`);
  }
  getSkillsChart(): Observable<Object> {
    return this.http.get(`${this.baseUrl}/api/chartdata.php`);
  }
  createEmployee(employee: Employee): Observable<Object> {
    //console.log(employee);
    const data = new FormData();
    data.append("firstName", employee.firstName);
    data.append("lastName", employee.lastName);
    data.append("emailId", employee.emailId);
    data.append("password", employee.password);
    return this.http.post<JSON>(`${this.baseUrl}/api/create.php`,  data);
    
  }

  updateEmployee(id: number, value: any, skills:any[]): Observable<Object> {
    console.log(skills);
    const data = new FormData();
    data.append("firstName", value.firstName);
    data.append("lastName", value.lastName);
    data.append("emailId", value.emailId);
    data.append("skills", JSON.stringify(skills));
    data.append("address", value.address);
    data.append("about", value.about);
    data.append("qualification", value.qualification);
    return this.http.post<JSON>(`${this.baseUrl}/api/update.php?id=${id}`, data)
    .pipe(
      tap(() => {
        this._refreshneeded$.next();
      }) 
    )
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/delete.php?id=${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/read.php`);
  }
  getEmployeesHealthStattus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/gethealthdata.php`);
  }
  getEmployeesListBySkill(skill:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getempbyskill.php?skill=${skill}`);
  }
  isCheckListFilled(): Observable<any> {
    return this.http.get<JSON>(`${this.baseUrl}/api/isChecklistFille.php`);
  }
  sendMail(): Observable<any> {
    return this.http.get<JSON>(`${this.baseUrl}/api/covidReportSendEmail.php`);
  }
  updateHealthChecklist(checklist: Checklist): Observable<Object> {
    //console.log(employee);
    const data = new FormData();
    data.append("eid", checklist.eid);
    data.append("cold", checklist.cold);    
    data.append("cough", checklist.cough);
    data.append("fever", checklist.fever);
    data.append("dib", checklist.difficultyinbreath);
    data.append("los", checklist.lossofsenses);
    data.append("other", checklist.other);
    data.append("comment", checklist.comment);
    console.log(data);
    return this.http.post<JSON>(`${this.baseUrl}/api/updatechecklist.php`,  data);
  }
}