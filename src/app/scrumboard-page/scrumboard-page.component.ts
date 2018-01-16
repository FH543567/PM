import { Component, OnInit } from '@angular/core';
import { Story } from '../story/story';
import { Task } from '../task/task';
import { StoryService } from '../services/story.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-scrumboard-page',
  templateUrl: './scrumboard-page.component.html',
  styleUrls: ['./scrumboard-page.component.css']
})
export class ScrumboardPageComponent implements OnInit {
  stories: Story[];
  tasks: Task[];
  tasksTodo: Task[] = [];
  tasksInprogress: Task[] = [];
  tasksDone: Task[] = [];
  constructor(private storyService: StoryService, private taskService: TaskService) { }

  ngOnInit() {
    this.getStories();
    this.getTasks();
    this.sortTasks();
  }

  getStories() {
    this.storyService.getStories()
      .subscribe(stories => this.stories = stories);
  }

  getTasks() {
      this.taskService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
  }

  sortTasks() {
    for (const task of this.tasks) {
      const progress = task.workedTime / task.workload * 100;
      if (progress === 0) {
        this.tasksTodo.push(task);
      }
      if (progress > 0 && progress < 100) {
        this.tasksInprogress.push(task);
      }
      if (progress === 100) {
        this.tasksDone.push(task);
      }
    }
  }
}
