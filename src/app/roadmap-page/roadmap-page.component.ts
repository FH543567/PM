import { Component, OnInit } from '@angular/core';
import { Sprint } from '../sprint/sprint';
import { Epic } from '../epic/epic';
import { Story } from '../story/story';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-roadmap-page',
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.css']
})
export class RoadmapPageComponent implements OnInit {
  displayedColumns = ['Id', 'Name', 'Start', 'End'];
  dataSource: any;
  epics: Epic[];
  sprints: Sprint[];
  stories: Story[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getEpics();
    this.getSprints();
    this.getStories();
  }

  getEpics() {
    this.dataService.getEpics()
      .subscribe(epics => this.epics = epics);
  }

  getSprints() {
    this.dataService.getSprints()
      .subscribe(sprints => this.sprints = sprints);
  }

  getStories() {
    this.dataService.getStories()
      .subscribe(stories => this.stories = stories);
  }
}
