import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { SprintService } from '../services/sprint.service';
import { Sprint } from '../sprint/sprint';
import { HistoryEntry } from './historyEntry';


@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css']
})
export class ChartPageComponent implements OnInit {
  sprints: Sprint[];
  history: HistoryEntry[];
  historyWorkRemainings: number[];
  historyLabels: string[];
  selectedSprint: number;
  selectSprintMessage: string;
  chartOptions = { responsive: true };
  /*
  chartData = [
    { data: [660, 600, 500, 475, 450, 160, 80, 0], label: 'Actual' },
    { data: [700, 600, 500, 400, 300, 200, 100, 0], label: 'Optimal' }
  ];
  */
  chartData = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Actual' },
    { data: [700, 600, 500, 400, 300, 200, 100, 0], label: 'Optimal' }
  ];
  chartLabels: string[] = ["8.0", "9.0", "10.0", "11.0", "12.0", "13.0", "14.0", "15.0"];

  constructor(private sprintService: SprintService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getSprints();
    this.getHistory();
  }

  getSprints() {
    this.sprintService.getAll()
      .subscribe(tasks => { this.sprints = tasks });
  }

  getHistory() {
    //this.history = history kann evtl raus
    this.sprintService.getFullHistory()
      .subscribe(history => { this.history = history, this.updateData(history) });
  }

  updateData(history : HistoryEntry[]) {
    this.historyWorkRemainings = [];
    this.historyLabels = [];
    for (let his of history) {
      if (his.sprintID == this.selectedSprint) {
        console.log("lade history in historyWorkRemainings. SprintID: " + his.sprintID + " date: " + his.date.toDateString() + "." + his.date.getMonth() + " workr: " + his.workRemaining);
        this.historyWorkRemainings.push(his.workRemaining)
        let dateFormat : string = this.datePipe.transform(his.date, "dd.MM")
        console.log("lade Label " + dateFormat);
        this.historyLabels.push(dateFormat);
      }
    }
  }

  updateChart() {
    this.updateData(this.history);

    //chart-daten müssen geklont und neu zugewießen werden, damit das Chart geupdatet wird. (keine Ahnung warum)
    let chartDataClone = JSON.parse(JSON.stringify(this.chartData));
    chartDataClone[0].data = [];
    chartDataClone[1].data = [];
    let chartLabelsClone = JSON.parse(JSON.stringify(this.chartLabels));
    chartLabelsClone = [];
    //-----ACTUAL-----
    //HistoryDaten für ausgewählten Sprint in chartData laden.
    for (let actual of this.historyWorkRemainings) {
      chartDataClone[0].data.push(actual);
    }
    //-----OPTIMAL-----
    //Berechne optimale Daten und lade in chartData
    let diff: number = this.historyWorkRemainings[0] / (this.historyWorkRemainings.length - 1);
    console.log("diff: " + diff);
    let i: number = 0;
    for (let optimal of this.historyWorkRemainings) {
      console.log("chartDataClone: " + JSON.stringify(chartDataClone));
      let newValue = chartDataClone[0].data[0] - (diff * i);
      chartDataClone[1].data.push(newValue);
      i++;
    }
    //-----LABEL-----
    for (let label of this.historyLabels) {
      chartLabelsClone.push(label);
    }
    //Hint anzeigen, wenn keine historischen Daten für Sprint vorliegen.
    if (chartLabelsClone.length == 0) {
      this.selectSprintMessage = "Für diesen Sprint liegen keine historischen Daten vor.";
    }
    else this.selectSprintMessage = null;
    //Klon einfügen. Chart wird hier erst neu gerendert.
    this.chartLabels = chartLabelsClone;
    console.log("chartLabels: " + JSON.stringify(this.chartLabels));
    this.chartData = chartDataClone;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
}


