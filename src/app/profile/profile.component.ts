import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
//import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { AuthService } from '../auth.service'
import { Router, ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  id: any;
  employee: Employee;
  dropdownList = [];
  selectedItems = [];
  selectedSkills = [];
  selectedSkillIds = [];
  serchSkills = [];
  skill:any;
  skills:any;
  dropdownSettings:IDropdownSettings;
  
  constructor(private route: ActivatedRoute,private router: Router,
  private employeeService: EmployeeService, private auth :AuthService) { }

  ngOnInit() {
    this.id = this.auth.getUserId();
    this.employee = new Employee();
    this.employeeService.refreshneeded$
      .subscribe(() => {
        this.reloadData();
    })
    this.reloadData();
  }
  reloadData() {
    this.id = this.auth.getUserId();
    this.selectedSkills = [];
    this.selectedSkillIds = [];
    this.employeeService.getSkillsList()
    .subscribe(data => {
        console.log(data)
        this.dropdownList = data;
      }, error => console.log(error)
    );
    
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

    this.employeeService.getProfile()
      .subscribe(data => {
        //console.log(data)
        this.employee = data;
    }, error => console.log(error));

  }

  searchSkills() {
    console.log(this.skill);
    if (this.skill != "") {
      this.employeeService.getSkillsListByName(this.skill)
      .subscribe(data => {
          this.serchSkills=data;
      }, error => console.log(error));
    }
  }

  updateEmployee() {
    //console.log(this.selectedSkills);
    this.employeeService.updateEmployee(this.id, this.employee, this.selectedSkillIds)
      .subscribe(data => console.log(data), error => console.log(error));
    this.employee = new Employee();
    //this.gotoList();
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
