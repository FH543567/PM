import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from '../sprint/sprint';
import { Task } from '../task/task';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/observable/zip';
import { zip } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  // sprints: Sprint[];
  sprint: Sprint;
  tasks: Task[];
  checkedTasks: Task[] = [];
  assignedTasks: Task[] = [];
  displayedColumns = ['Id', 'Name', 'EstTime', 'Add'];
  dataSource: any;
  constructor(private route: ActivatedRoute, private sprintService: SprintService, private taskService: TaskService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    //Wartet, bis der Sprint und alle Tasks angekommen und füre dann die Befehle in subscribe aus.
    forkJoin(
      this.getSprint(),
      this.getTasks()
    )
    .subscribe(res => {
      console.log("forkjoin: " + JSON.stringify(res))
      this.sprint = res[0],
      this.tasks = res[1],
      this.dataSource = new MatTableDataSource<Task>(res[1]),
      this.getAssignedTasks()
    });

  
  }

  getSprint() : Observable<Sprint> {
    return this.sprintService.getById(this.id);

  }

  getTasks() : Observable<Task[]> {
    return this.taskService.getAll();
  }

  getAssignedTasks() {
    for (const task of this.tasks) {
      if (task.sprintId === this.sprint.id) {
        this.assignedTasks.push(task);
      }
    }
  }

  check(task: Task) {
    let included = this.checkedTasks.includes(task);
    console.log('Included before: ' + included);
    if (included === true) {
      this.checkedTasks.splice(this.checkedTasks.indexOf(task), 1);
    }
    if (included === false) {
      this.checkedTasks.push(task);
    }
    included = this.checkedTasks.includes(task);
    console.log('Included after: ' + included);
  }

  // TODO: muss noch über den Service auf der DB geändert werden
  addTasks() {
    console.log('addTasks');
    for (const task of this.checkedTasks) {
      task.sprintId = this.sprint.id;
    }
  }

  delete() {
    this.sprintService.delete(this.sprint.id);
  }
}
