import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Sprint } from '../sprint/sprint';
import { BacklogPageComponent } from '../backlog-page/backlog-page.component';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css']
})
export class SprintPageComponent implements OnInit {
  displayedColumns = ['Id', 'Name', 'Start', 'End'];
  dataSource: any;
  sprints: Sprint[];
  constructor(private sprintService: SprintService) { }

  ngOnInit() {
    this.getSprints();
    this.dataSource = new MatTableDataSource<Sprint>(this.sprints);
  }


  getSprints() {
    this.sprintService.getSprints()
      .subscribe(sprints => this.sprints = sprints);
  }
}
