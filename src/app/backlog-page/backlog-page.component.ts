import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { DataService } from '../services/data.service';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Backlog } from '../backlog/backlog';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.css']
})
export class BacklogPageComponent implements OnInit {
  tasks: Task[];
  stories: Story[];
  epics: Epic[];
  backlogItems: Backlog[];
  displayedColumns = ['Id'];
  dataSource = new MatTableDataSource<Backlog>(this.tasks);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.backlogItems = [];
    this.getTasks();
    this.getStories();
    this.getEpics();
    this.taskToBacklog(this.tasks);
    this.storyToBacklog(this.stories);
    this.epicToBacklog(this.epics);
  }

  taskToBacklog(tasks: Task[]) {
    for (const task of tasks) {
      const backlog = new Backlog();
      backlog.id = task.id;
      backlog.name = task.name;
      backlog.description = task.description;
      backlog.priority = task.priority;
      backlog.estimatedTime = task.estimatedTime;
      backlog.workedTime = task.workedTime;
      this.backlogItems.push(backlog);
    }
  }

  storyToBacklog(stories: Story[]) {
    for (const story of stories) {
      let estimateSum = 0;
      let workedSum = 0;
      for (const task of story.tasks) {
        estimateSum += task.estimatedTime;
        workedSum += task.workedTime;
      }
      const backlog = new Backlog();
      backlog.id = story.id;
      backlog.name = story.name;
      backlog.description = story.description;
      backlog.priority = story.priority;
      backlog.estimatedTime = estimateSum;
      backlog.workedTime = workedSum;
      this.backlogItems.push(backlog);
    }
  }

  epicToBacklog(epics: Epic[]) {
    for (const epic of epics) {
      let estimateSum = 0;
      let workedSum = 0;
      for (const story of epic.stories) {
        let estimateSumTemp = 0;
        let workedSumTemp = 0;
        for (const task of story.tasks) {
          estimateSumTemp += task.estimatedTime;
          workedSumTemp += task.workedTime;
        }
        estimateSum += estimateSumTemp;
        workedSum += workedSumTemp;
      }
      const backlog = new Backlog();
      backlog.id = epic.id;
      backlog.name = epic.name;
      backlog.description = epic.description;
      backlog.priority = epic.priority;
      backlog.estimatedTime = estimateSum;
      backlog.workedTime = workedSum;
      this.backlogItems.push(backlog);
    }
  }

  getTasks() {
    this.dataService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getStories() {
    this.dataService.getStories()
      .subscribe(stories => this.stories = stories);
  }

  getEpics() {
    this.dataService.getEpics()
      .subscribe(epics => this.epics = epics);
  }
}
