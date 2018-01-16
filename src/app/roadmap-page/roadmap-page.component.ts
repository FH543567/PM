import { Component, OnInit } from '@angular/core';
import { Sprint } from '../sprint/sprint';
import { Epic } from '../epic/epic';
import { Story } from '../story/story';
import { EpicService } from '../services/epic.service';
import { SprintService } from '../services/sprint.service';
import { StoryService } from '../services/story.service';

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
  constructor(private epicService: EpicService, private sprintService: SprintService, private storyService: StoryService) { }

  ngOnInit() {
    this.getEpics();
    this.getSprints();
    this.getStories();
  }

  getEpics() {
    this.epicService.getEpics()
      .subscribe(epics => this.epics = epics);
  }

  getSprints() {
    this.sprintService.getSprints()
      .subscribe(sprints => this.sprints = sprints);
  }

  getStories() {
    this.storyService.getStories()
      .subscribe(stories => this.stories = stories);
  }
}
