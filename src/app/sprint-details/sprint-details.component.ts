import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Sprint } from '../sprint/sprint';
import { Task } from '../task/task';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  sprints: Sprint[];
  sprint: Sprint;
  tasks: Task[];
  displayedColumns = ['Id', 'Name', 'EstTime'];
  dataSource: any;
  constructor(private route: ActivatedRoute, private sprintService: SprintService, private taskService: TaskService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getSprints();
    this.getTasks();
    for (let i = 0; i < this.sprints.length; i++) {
      if (this.id = this.sprints[i].id) {
        this.sprint = this.sprints[i];
      }
    }
    this.dataSource = new MatTableDataSource<Task>(this.tasks);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSprints()  {
    this.sprintService.getSprints()
      .subscribe(sprints => this.sprints = sprints);
  }

  getTasks()  {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }
}
