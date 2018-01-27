import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.getData(this.id);
    // this.getSprint();
    // this.getTasks();
    /*
    for (let i = 0; i < this.sprints.length; i++) {
      if (this.id = this.sprints[i].id) {
        this.sprint = this.sprints[i];
      }
    }*/
  }

  getData(id: number) {
    this.sprintService.getById(id)
      .subscribe(sprint => this.sprint = sprint,
        error => console.log('Error: ', error),
        () => this.taskService.getAll()
          .subscribe(tasks => this.tasks = tasks,
            error => console.log('Error: ', error),
            () => this.taskService.getBySprintId(this.sprint.id)
              .subscribe(assignedTasks => this.assignedTasks = this.assignedTasks,
                error => console.log('Error: ', error),
                () => this.dataSource = new MatTableDataSource<Task>(this.tasks)
              )
          )
      );
  }

  getSprint()  {
    this.sprintService.getById(this.id)
      .subscribe(sprint => this.sprint = sprint,
        error => console.log('Error: ', error),
        () => this.getAssignedTasks()
      );
  }

  getTasks()  {
    this.taskService.getAll()
      .subscribe(tasks => this.tasks = tasks,
        error => console.log('Error: ', error),
        () => this.dataSource = new MatTableDataSource<Task>(this.tasks)
      );
  }

  // TODO: Vom Service abfragen
  getAssignedTasks() {
    this.taskService.getBySprintId(this.sprint.id)
      .subscribe(tasks => this.assignedTasks = tasks);

    /* old getAssignedTasks()
    for (const task of this.tasks) {
      if (task.sprintId === this.sprint.id) {
        this.assignedTasks.push(task);
      }
    }
     */
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
