import { Component, OnInit } from '@angular/core';
import { Sprint } from '../sprint/sprint';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../services/sprint.service';
import { AuthService } from '../services/auth.service';
import {Task} from '../task/task';

@Component({
  selector: 'app-sprint-page',
  templateUrl: './sprint-page.component.html',
  styleUrls: ['./sprint-page.component.css']
})
export class SprintPageComponent implements OnInit {
  displayedColumns = ['Id', 'Name', 'Start', 'End'];
  dataSource: any;
  sprints: Sprint[];
  constructor(private sprintService: SprintService,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
    console.log('getSprints');
    this.sprintService.getAll()
      .subscribe(sprints => this.sprints = sprints,
        error => console.log('Error: ', error),
        () => this.checkStartDates()
      );
  }

  formatDate() {
    for (const sprint of this.sprints) {
      sprint.startDate = new Date(sprint.startDate).toLocaleDateString().toString();
      sprint.endDate = new Date(sprint.endDate).toLocaleDateString().toString();
    }
    this.dataSource = new MatTableDataSource<Sprint>(this.sprints);
  }

  checkStartDates() {
    const markedSprints: Sprint[] = [];
    for (const sprint of this.sprints) {
      if (new Date(sprint.endDate) <= new Date()) {
        markedSprints.push(sprint);
      }
    }
    for (const markedSprint of markedSprints) {
      this.sprints.splice(this.sprints.indexOf(markedSprint), 1);
    }
    this.formatDate();
  }

  isScrumMaster(): boolean {
    return this.authService.isScrumMaster;
  }
}
