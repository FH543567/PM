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
    this.getTask(id);
    this.getStory(this.task.storyId);
    this.getSprint(this.task.sprintId);
    this.getUser(this.task.userId);
    this.updateProgress();
    this.tempWorkedTime = this.task.workedTime;
  }

  getTask(id: number) {
    this.taskService.getById(id)
      .subscribe( task => this.task = task);
  }

  getStory(id: number) {
    this.storyService.getById(id)
      .subscribe( story => this.story = story);
  }

  getSprint(id: number) {
    this.sprintService.getById(id)
      .subscribe( sprint => this.sprint = sprint);
  }

  getUser(id: number) {
    this.userService.getById(id)
      .subscribe( user => this.user = user);
  }

  updateProgress() {
    this.progress = this.task.workedTime / this.task.workload * 100;
  }

  save(value: number) {
    console.log('Save');
    this.task.workedTime = this.tempWorkedTime;
    this.updateProgress();
  }

  delete() {
    this.storyService.delete(this.story.id);
  }
}
