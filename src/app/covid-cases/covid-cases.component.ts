import { Component, OnInit } from '@angular/core';  
import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http';  
import { Covid } from '../../app/Covid'; 

@Component({
  selector: 'app-covid-cases',
  templateUrl: './covid-cases.component.html',
  styleUrls: ['./covid-cases.component.sass']
})
export class CovidCasesComponent implements OnInit {  
  url = 'https://api.covid19india.org/data.json';  
  data: Covid[];  
  state = [];  
  active = []; 
  reccovered = []; 
  deaths = [];  
  Linechart = []; 
  jsonData :any[]; 
  covid_data = [];
  constructor(private httpClient: HttpClient) { }  
  ngOnInit() {  
    this.httpClient.get(this.url).subscribe((result: Covid[]) => {  
     
      JSON.parse(JSON.stringify(result))['statewise'].forEach(x => {
        if (x.state != "Total")  {
          this.state.push(x.state);  
          this.active.push(x.active); 
          this.reccovered.push(x.recovered);  
          this.deaths.push(x.deaths); 
          this.covid_data.push(x);
        }
      });
      //console.log(this.covid_data);
     
    });  
  }  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = this.state;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.active, label: 'Active'},
    {data: this.reccovered, label: 'Recovered'},
    {data: this.deaths, label: 'Deaths'},
  ];
}
