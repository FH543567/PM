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
  constructor(private storyService: StoryService, private taskService: TaskService) { }

  ngOnInit() {
    this.getStories();
    this.getTasks();
  }

  getStories() {
    this.storyService.getStories()
      .subscribe(stories => this.stories = stories);
  }

  getTasks() {
      this.taskService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
  }
}
