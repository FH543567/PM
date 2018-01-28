import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task/task';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
import { SprintService } from '../services/sprint.service';
import { Sprint } from '../sprint/sprint';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  // newPokerDialogRef: MatDialogRef<DeleteConfirmComponent>;
  result = false;
  task: Task;
  story: Story;
  sprint: Sprint;
  user: User;
  progress: number;
  tempWorkedTime: number;
  private sub: any;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private storyService: StoryService,
              private sprintService: SprintService, private userService: UserService, private dialog: MatDialog,
              public router: Router, private authService: AuthService) { }

  ngOnInit() {
    let id: number;
    this.sub = this.route.params.subscribe(params => {
      id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData(id);
  }

  getData(id: number) {
    this.taskService.getById(id)
      .subscribe( task => this.task = task,
        error => console.log('Error: ', error),
        () => this.storyService.getById(this.task.storyId)
          .subscribe( story => this.story = story,
            error => console.log('Error: ', error),
            () => this.sprintService.getById(this.task.sprintId)
              .subscribe( sprint => this.sprint = sprint,
                error => console.log('Error: ', error),
                () => this.userService.getById(this.task.userId)
                  .subscribe( user => this.user = user,
                    error => console.log('Error: ', error),
                    () => this.updateProgress()
                  )
              )
          )
      );
  }

  updateProgress() {
    this.progress = this.task.workedTime / this.task.workload * 100;
    this.tempWorkedTime = this.task.workedTime;
  }

  save() {
    this.task.workedTime = this.tempWorkedTime;
    this.taskService.update(this.task);
    this.updateProgress();
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      height: '150px',
      width: '300px',
      data: { type: 'Task', name: this.task.name}
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
      this.taskService.delete(this.task.id)
        .subscribe( empty => this.result = false,
          error => console.log('Error: ', error),
          () => this.router.navigate(['../../../backlog'])
        );
    }
  }
}
