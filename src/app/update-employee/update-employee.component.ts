import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';



@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.sass']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  dropdownList = [];
  selectedItems = [];
  selectedSkills = [];
  selectedSkillIds = [];
  skills:any;
  dropdownSettings:IDropdownSettings;
  
  constructor(private route: ActivatedRoute,private router: Router,
  private employeeService: EmployeeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getSkillsList()
      .subscribe(data => {
        console.log(data)
        this.dropdownList = data;
      }, error => console.log(error));

    this.employeeService.getEmpSkillsList(this.id)
      .subscribe(data => {
        //console.log(data)
        this.selectedItems = data;
        data.forEach(item => {
          //console.log(item);
          this.selectedSkillIds.push(item.id);
          this.selectedSkills.push(item.skill);
        });
      }, error => console.log(error));
    /*this.dropdownList = [
      { id: 1, item_text: 'Java' },
      { id: 2, item_text: 'Python' },
      { id: 3, item_text: 'PHP' },
      { id: 4, item_text: 'AWS' },
      { id: 5, item_text: 'HMTL' }
    ];*/
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'skill',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      maxHeight:150
    };
    this.skills=this.selectedItems;

    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        //console.log(data)
        this.employee = data;
      }, error => console.log(error));

  }

  updateEmployee() {
    //console.log(this.selectedSkills);
    this.employeeService.updateEmployee(this.id, this.employee, this.selectedSkillIds)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();    
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
  onItemSelect(item: any) {
    this.selectedSkills.push(item.skill);
    this.selectedSkillIds.push(item.id);
    //console.log(item);
  }
  onItemUnSelect (item: any) {
    const index = this.selectedSkills.indexOf(item.skill);
    if (index > -1) {
      this.selectedSkills.splice(index, 1);
    }
    const Iindex = this.selectedSkillIds.indexOf(item.id);
    if (Iindex > -1) {
      this.selectedSkillIds.splice(Iindex, 1);
    }
  }
  onSelectAll(items: any) {
    while (this.selectedSkills.length) {
      this.selectedSkills.pop();
    }
    while (this.selectedSkillIds.length) {
      this.selectedSkillIds.pop();
    }
    //console.log(items);
    items.forEach(i => {
      this.selectedSkills.push(i.skill);
      this.selectedSkillIds.push(i.id);
    });
  }
  onUnSelectAll() {
    while (this.selectedSkills.length) {
      this.selectedSkills.pop();
    }
    while (this.selectedSkillIds.length) {
      this.selectedSkillIds.pop();
    }
  
  }
}