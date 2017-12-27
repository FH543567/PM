import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { DataService } from '../services/data.service';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Backlog } from '../backlog/backlog';
import {MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';


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
  displayedColumns = ['Id', 'Name', 'Priority', 'Estimated', 'Worked'];
  dataSource: any;
  // dataSource = new BacklogDataSource(this.dataService);

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.backlogItems = [];
    this.getTasks();
    this.getStories();
    this.getEpics();
    this.taskToBacklog(this.tasks);
    this.storyToBacklog(this.stories);
    this.epicToBacklog(this.epics);
    this.dataSource = new MatTableDataSource<Backlog>(this.backlogItems);
  }

  taskToBacklog(tasks: Task[]) {
    for (const task of tasks) {
      const backlog = new Backlog(task.id, task.name, 'Task', task.description, task.priority, task.estimatedTime, task.workedTime);
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
      const backlog = new Backlog(story.id, story.name, 'Story', story.description, story.priority, estimateSum, workedSum);
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
      const backlog = new Backlog(epic.id, epic.name, 'Epic', epic.description, epic.priority, estimateSum, workedSum);
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
/*
// Alternative Herangehensweise um Daten für eine Tabelle zu ziehen
export class BacklogDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }
  connect(): Observable<Task[]> {
    return this.dataService.getTasks();
  }
  disconnect() {}
}
*/
