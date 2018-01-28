import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task/task';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
import { SprintService } from '../services/sprint.service';
import { Sprint } from '../sprint/sprint';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task;
  story: Story;
  sprint: Sprint;
  user: User;
  progress: number;
  tempWorkedTime: number;
  private sub: any;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private storyService: StoryService,
              private sprintService: SprintService, private userService: UserService) { }

  ngOnInit() {
    let id: number;
    this.sub = this.route.params.subscribe(params => {
      id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData(id);
    /*
    this.getTask(id);
    this.getStory(this.task.storyId);
    this.getSprint(this.task.sprintId);
    this.getUser(this.task.userId);
    */
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

  getTask(id: number) {
    this.taskService.getById(id)
      .subscribe( task => this.task = task,
        error => console.log('Error: ', error),
        () => this.updateProgress()
      );
  }

  getStory(id: number) {
    this.storyService.getById(id)
      .subscribe( story => this.story = story,
        error => console.log('Error: ', error)
      );
  }

  getSprint(id: number) {
    this.sprintService.getById(id)
      .subscribe( sprint => this.sprint = sprint,
        error => console.log('Error: ', error)
      );
  }

  getUser(id: number) {
    this.userService.getById(id)
      .subscribe( user => this.user = user,
        error => console.log('Error: ', error)
      );
  }

  updateProgress() {
    this.progress = this.task.workedTime / this.task.workload * 100;
    this.tempWorkedTime = this.task.workedTime;
  }

  save(value: number) {
    this.task.workedTime = this.tempWorkedTime;
    this.updateProgress();
  }

  delete() {
    this.storyService.delete(this.story.id);
  }
}
