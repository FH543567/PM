import { Component, OnInit } from '@angular/core';
import { Sprint } from '../sprint/sprint';
import { Epic } from '../epic/epic';
import { Story } from '../story/story';
import { EpicService } from '../services/epic.service';
import { SprintService } from '../services/sprint.service';
import { StoryService } from '../services/story.service';
import {MatTableDataSource} from '@angular/material';

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
  constructor(private epicService: EpicService,
              private sprintService: SprintService,
              private storyService: StoryService
  ) {}

  ngOnInit() {
    this.getEpics();
    this.getSprints();
    this.getStories();
  }

  getEpics() {
    this.epicService.getAll()
      .subscribe(epics => this.epics = epics,
        error => console.log('Error: ', error)
      );
  }

  getSprints() {
    this.sprintService.getAll()
      .subscribe(sprints => this.sprints = sprints,
        error => console.log('Error: ', error),
        () => this.formatDate()
      );
  }

  getStories() {
    this.storyService.getAll()
      .subscribe(stories => this.stories = stories,
        error => console.log('Error: ', error)
      );
  }

  formatDate() {
    for (const sprint of this.sprints) {
      sprint.startDate = new Date(sprint.startDate).toLocaleDateString().toString();
      sprint.endDate = new Date(sprint.endDate).toLocaleDateString().toString();
    }
  }
}
