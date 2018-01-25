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
import {Observable} from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
      id = +params['id'], // (+) converts string 'id' to a number
      this.getTask(id).subscribe(task => 
        this.taskReceived(task)
      );
    });
  }

  /**
   * Wird erst aufgerufen, wenn der Task vom Server Empfangen wurde
   * @param task 
   */
  taskReceived(task : Task) {
    this.task = task;
    this.getStory(task.storyId).subscribe(story => this.story = story);
    this.getSprint(task.sprintId).subscribe(sprint => this.sprint = sprint);
    if (task.userId) this.getUser(task.userId).subscribe(user => this.user = user);
    this.updateProgress();
    this.tempWorkedTime = this.task.workedTime;
  }


  getTask(id: number) : Observable<Task> {
    return this.taskService.getById(id);
  }

  getStory(id: number) : Observable<Story> {
    return this.storyService.getById(id);
  }

  getSprint(id: number) : Observable<Sprint> {
    return this.sprintService.getById(id);
  }

  getUser(id: number) : Observable<User> {
    return this.userService.getById(id);
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
