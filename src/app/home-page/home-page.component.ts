import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { TaskService } from '../services/task.service';
import { StoryService } from '../services/story.service';
import { EpicService } from '../services/epic.service';
import { SprintService } from '../services/sprint.service';
import {Sprint} from '../sprint/sprint';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  taskTest: Task;
  storyTest: Story;
  epicTest: Epic;
  stories: Story[];
  tasks: Task[];
  epics: Epic[];
  sprints: Sprint[];
  storyById: Story;
  taskById: Task;
  epicById: Epic;
  storyByEpicId: Story[];
  constructor(private taskService: TaskService,
              private storyService: StoryService,
              private epicService: EpicService,
              private sprintService: SprintService) { }

  ngOnInit() {
    this.getTasks();
    this.getStories();
    this.getEpics();
    this.getSprints();
    this.getTaskById();
    this.getStoryById();
    this.getEpicById();
    this.getData();
    this.getStoryByEpicId();
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe( tasks => this.tasks = tasks,
        error => console.log('Error: ', error),
        () => console.log('Tasks loaded')
      );
  }

  getStories() {
    this.storyService.getAll()
      .subscribe(stories => this.stories = stories,
      error => console.log('Error: ', error),
      () => console.log('Stories loaded')
    );
  }

  getEpics() {
    this.epicService.getAll()
      .subscribe(epics => this.epics = epics,
        error => console.log('Error: ', error),
        () => console.log('Epics loaded')
      );
  }

  getSprints() {
    this.sprintService.getAll()
      .subscribe(sprints => this.sprints = sprints,
        error => console.log('Error: ', error),
        () => console.log('Sprints loaded')
      );

  }

  getTaskById() {
    this.taskService.getById(101)
      .subscribe( taskById => this.taskById = taskById,
        error => console.log('Error: ', error),
        () => console.log('TaskById loaded')
      );
  }

  getStoryById() {
    this.storyService.getById(51)
      .subscribe(storyById => this.storyById = storyById,
        error => console.log('Error: ', error),
        () => console.log('StoryById loaded')
      );
  }

  getEpicById() {
    this.epicService.getById(1)
      .subscribe( epicById => this.epicById = epicById,
        error => console.log('Error: ', error),
        () => console.log('EpicById loaded')
      );
  }

  getStoryByEpicId() {
    this.storyService.getByEpicId(1)
      .subscribe(storyByEpicId => this.storyByEpicId = storyByEpicId,
      error => console.log('Error: ', error)
      );
  }

  getData() {
    this.taskService.getById(101)
      .subscribe( taskTest => this.taskTest = taskTest,
        error => console.log('Error: ', error),
        () => this.storyService.getById(this.taskTest.storyId)
          .subscribe(storyTest => this.storyTest = storyTest,
            error => console.log('Error: ', error),
            () => console.log('getData loaded')
          )
      );
  }
/*
  getData2() {
    this.taskService.getById(101)
      .subscribe( taskTest => {this.taskTest = taskTest, this.storyService.getById(taskTest.storyId)
      .subscribe(storyTest => this.storyTest = storyTest))};
  }
*/
}
