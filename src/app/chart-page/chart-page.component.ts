import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {
  chartOptions = { responsive: true };
  chartData = [
    { data: [660, 600, 500, 475, 450, 160, 80, 0], label: 'Actual' },
    { data: [700, 600, 500, 400, 300, 200, 100, 0], label: 'Optimal' }
  ];
  chartLabels = ['', '08.01', '09.01', '10.01', '11.01', '12.01', '13.01', '14.01'];

  constructor() {}

  ngOnInit() { }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }


}


