import { Component, OnInit } from '@angular/core';
import { Story } from '../story/story';
import { Task } from '../task/task';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-scrumboard-page',
  templateUrl: './scrumboard-page.component.html',
  styleUrls: ['./scrumboard-page.component.css']
})
export class ScrumboardPageComponent implements OnInit {
  stories: Story[];
  tasks: Task[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.dataService.getStories()
      .subscribe(stories => this.stories = stories);
  }
}
