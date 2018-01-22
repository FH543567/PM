import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Backlog } from '../backlog/backlog';
import { MatTableDataSource } from '@angular/material';
import { TaskService } from '../services/task.service';
import { StoryService } from '../services/story.service';
import { EpicService } from '../services/epic.service';

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
  displayedColumns = ['Id', 'Name', 'Type', 'Priority', 'Progress'];
  dataSource: any;
  // dataSource = new BacklogDataSource(this.dataService);

  constructor(private taskService: TaskService, private storyService: StoryService, private epicService: EpicService) { }

  ngOnInit() {
    this.backlogItems = [];
    this.getTasks();
    this.getStories();
    this.getEpics();
    //this.taskToBacklog();
    //this.storyToBacklog();
    //this.epicToBacklog();
    //this.dataSource = new MatTableDataSource<Backlog>(this.backlogItems);
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe(tasks => {this.tasks = tasks, this.taskToBacklog()});
  }

  getStories() {
    this.storyService.getAll()
      .subscribe(stories => {this.stories = stories, this.storyToBacklog()});
  }

  getEpics() {
    this.epicService.getAll()
      .subscribe(epics => {this.epics = epics, this.epicToBacklog(), this.dataSource = new MatTableDataSource<Backlog>(this.backlogItems)});
  }

  taskToBacklog() {
    for (const task of this.tasks) {
      const progress = task.workedTime / task.workload * 100;
      const backlog = new Backlog(task.id, task.name, 'Task', task.description, task.priority, progress);
      this.backlogItems.push(backlog);
    }
  }

  storyToBacklog() {
    for (const story of this.stories) {
      let workloadTask = 0;
      let workedTimeTask = 0;
      for (const task of this.tasks) {
        if (task.storyId === story.id) {
          workloadTask += task.workload;
          workedTimeTask += task.workedTime;
        }
      }
      const progress = workedTimeTask / workloadTask * 100;
      const backlog = new Backlog(story.id, story.name, 'Story', story.description, story.priority, progress);
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

  epicToBacklog() {
    for (const epic of this.epics) {
      let workloadStory = 0;
      let workedTimeStory = 0;
      for (const story of this.stories) {
        if (story.epicId === epic.id) {
          let workloadTask = 0;
          let workedTimeTask = 0;
          for (const task of this.tasks) {
            if (task.storyId === story.id) {
              workloadTask += task.workload;
              workedTimeTask += task.workedTime;
            }
          }
          workloadStory += workloadTask;
          workedTimeStory += workedTimeTask;
        }
      }
      const progress = workedTimeStory / workloadStory * 100;
      const backlog = new Backlog(epic.id, epic.name, 'Epic', epic.description, epic.priority, progress);
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
