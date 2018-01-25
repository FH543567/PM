import { Component, OnInit } from '@angular/core';
import { Story } from '../story/story';
import { Task } from '../task/task';
import { StoryService } from '../services/story.service';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/zip';
import 'rxjs/observable/merge';

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
    this.getStories().subscribe(stories => this.stories = stories);
    //sortTasks() wird erst ausgeführt, wenn die Antwort von getTasks() angekommen ist:
    this.getTasks().subscribe(tasks => {
      this.tasks = tasks, 
      this.sortTasks()
    });
    
  }

  getStories() : Observable<Story[]> {
    return this.storyService.getAll()
  }

  getTasks() : Observable<Task[]> {
      return this.taskService.getAll()
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
