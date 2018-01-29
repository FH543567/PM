import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from '../sprint/sprint';
import { Task } from '../task/task';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {
  id: number;
  result = false;
  private sub: any;
  timeLeft = 0;
  sprint: Sprint;
  tasks: Task[];
  checkedTasks: Task[] = [];
  assignedTasks: Task[] = [];
  displayedColumns = ['Id', 'Name', 'EstTime', 'Add'];
  dataSource: any;
  constructor(private route: ActivatedRoute,
              private sprintService: SprintService,
              private taskService: TaskService,
              private authService: AuthService,
              public router: Router,
              private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData(this.id);
  }

  getData(id: number) {
    this.sprintService.getById(id)
      .subscribe(sprint => this.sprint = sprint,
        error => console.log('Error: ', error),
        () => this.taskService.getAll()
          .subscribe(tasks => this.tasks = tasks,
            error => console.log('Error: ', error),
            () => this.taskService.getBySprintId(this.sprint.id)
              .subscribe(assignedTasks => this.assignedTasks = assignedTasks,
                error => console.log('Error: ', error),
                () => this.formatDate()
              )
          )
      );
  }

  formatDate() {
    this.sprint.startDate = new Date(this.sprint.startDate).toLocaleDateString().toString();
    this.sprint.endDate = new Date(this.sprint.endDate).toLocaleDateString().toString();
    this.calcTimeLeft();
  }

  calcTimeLeft() {
    for (const task of this.assignedTasks) {
      this.timeLeft += task.workload;
    }
    this.timeLeft = this.sprint.availableTime - this.timeLeft;
    this.dataSource = new MatTableDataSource<Task>(this.tasks);
  }

  check(task: Task) {
    const included = this.checkedTasks.includes(task);
    if (included === true) {
      this.checkedTasks.splice(this.checkedTasks.indexOf(task), 1);
    }
    if (included === false) {
      this.checkedTasks.push(task);
    }
  }

  addTasks() {
    for (const task of this.checkedTasks) {
      task.sprintId = this.sprint.id;
      this.taskService.update(task)
        .subscribe();
    }
    this.ngOnInit();
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      height: '150px',
      width: '300px',
      data: { type: 'Sprint', name: this.sprint.name}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.result = true;
        }
      }, error => console.log('Error: ', error),
      () => this.delete());
  }

  delete() {
    if (this.result === true) {
      this.sprintService.delete(this.sprint.id)
        .subscribe( empty => this.result = false,
          error => console.log('Error: ', error),
          () => this.router.navigate(['../../../sprint'])
        );
    }
  }

  isScrumMaster(): boolean {
    return this.authService.isScrumMaster;
  }
}
