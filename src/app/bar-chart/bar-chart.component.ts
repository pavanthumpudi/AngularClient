import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { SkillData } from '../skillData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit {

  chartData=[];
  chartLabel=[];
  role:number;

  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    this.employeeService.getProfilerole()
    .subscribe( 
      role => {
        this.role = role.profile_role
      }
    );

    this.employeeService.getSkillsChart()
    .subscribe((result: SkillData[]) => {  
        result.forEach(x => { 
          this.chartData.push(x.skillCount);  
          this.chartLabel.push(x.skill);  
        }); 
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    /*scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }*/
  };

  public barChartLabels = this.chartLabel;
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    {data: this.chartData, label: 'Skill', backgroundColor: [  
      "#3cb371",  
      "#0000FF",  
      "#9966FF",  
      "#4C4CFF",  
      "#00FFFF",  
      "#f990a7",  
      "#aad2ed",  
      "#FF00FF",  
      "Blue",  
      "Red",  
      "Blue"  
    ], }
  ];

}
