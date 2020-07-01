import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Checklist } from '../checklist';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.sass']
})
export class ChecklistComponent implements OnInit {
  checklist:Checklist = new Checklist();
  item="";
  NoHealthIssue = true;
  Noclicked = false;
  submitted= false;
  alreadySubmitted= false;
  form: FormGroup;
  Data: Array<any> = [
    {name: 'Cold', value: 'Cold'},
    {name: 'Cough', value: 'Cough'},
    {name: 'Fever', value: 'Fever'},
    {name: 'Difficulty In Breathing', value: 'DifficultyInBreathing'},
    {name: 'Loss Of Senses For Smell And Taste', value: 'LossOfSensesForSmellAndTaste'}
  
  ];
  otherChecked = "";
  err_message: any;
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    ){
    this.form = this.fb.group({
      checkArray: this.fb.array([],[Validators.required])
    })
  }
  healthIssue() {
    this.Noclicked = false;
    this.NoHealthIssue = false;
  }
  noHealthIssue() {
    this.Noclicked = true;
    this.NoHealthIssue = true;
    this.onSubmit();
  }
  onCheckboxChange(e){
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
      if(e.target.value=="Cold")
      {
        this.checklist.cold="1";
      }
      if(e.target.value=="Cough")
      {
        this.checklist.cough="1";
      }
      if(e.target.value=="Fever")
      {
        this.checklist.fever="1";
      }
      if(e.target.value=="DifficultyInBreathing")
      {
        this.checklist.difficultyinbreath="1";
      }
      if(e.target.value=="LossOfSensesForSmellAndTaste")
      {
        this.checklist.lossofsenses="1";
      }
      
        
    } else{
      let i : number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if(item.value == e.target.value){

          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  
  onSubmit() {
    this.submitted = true;
    this.employeeService.updateHealthChecklist(this.checklist)
      .subscribe(data => console.log(data),
      (error:HttpErrorResponse) => {
        this.alertService.error(error.error.message);
        this.err_message = error.error.message;
    });
    console.log(this.checklist); 
  }
  ngOnInit(): void {
    this.employeeService.isCheckListFilled()
    .subscribe(
      data => {
        if (data.count >0) {
          this.alreadySubmitted = true;
          this.err_message = data.message;
        }
        console.log(data)
      },
      (error:HttpErrorResponse) => {
        this.alertService.error(error.error.message);

      }
    );
  }

}
