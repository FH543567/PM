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
  tasks: Task[] = [];
  tasksTodo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];
  constructor(private storyService: StoryService, private taskService: TaskService) { }

  ngOnInit() {
    this.getStories();
    this.getTasks();
  }

  getStories() {
    this.storyService.getAll()
      .subscribe(stories => this.stories = stories,
        error => console.log('Error: ', error)
      );
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe(
        tasks => this.tasks = tasks,
        error => console.log('Error: ', error),
        () => this.sortTasks()
      );
  }

  sortTasks() {
    console.log('sortTasks');
    for (const task of this.tasks) {
      const progress = task.workedTime / task.workload * 100;
      if (progress === 0) {
        this.tasksTodo.push(task);
      }
      if (progress > 0 && progress < 100) {
        this.tasksInProgress.push(task);
      }
      if (progress === 100) {
        this.tasksDone.push(task);
      }
    }
  }
}
