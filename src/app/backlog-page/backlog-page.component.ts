import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Backlog } from '../backlog/backlog';
import { MatTableDataSource } from '@angular/material';
import { TaskService } from '../services/task.service';
import { StoryService } from '../services/story.service';
import { EpicService } from '../services/epic.service';
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

  constructor(private taskService: TaskService, private storyService: StoryService, private epicService: EpicService) { }

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

  getTasks() {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getStories() {
    this.storyService.getStories()
      .subscribe(stories => this.stories = stories);
  }

  getEpics() {
    this.epicService.getEpics()
      .subscribe(epics => this.epics = epics);
  }

  taskToBacklog(tasks: Task[]) {
    for (const task of tasks) {
      const backlog = new Backlog(task.id, task.name, 'Task', task.description, task.priority, task.workload, task.workedTime);
      this.backlogItems.push(backlog);
    }
  }

  storyToBacklog(stories: Story[]) {
    for (const story of stories) {
      const backlog = new Backlog(story.id, story.name, 'Story', story.description, story.priority, 0, 0);
      this.backlogItems.push(backlog);
    }
    /* backup
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
     */
  }

  epicToBacklog(epics: Epic[]) {
    for (const epic of epics) {
      const backlog = new Backlog(epic.id, epic.name, 'Epic', epic.description, epic.priority, 0, 0);
      this.backlogItems.push(backlog);
    }
    /* backup
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
     */
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
