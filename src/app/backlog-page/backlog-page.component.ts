import {Component, OnInit, ViewChild} from '@angular/core';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Backlog } from '../backlog/backlog';
import { TaskService } from '../services/task.service';
import { StoryService } from '../services/story.service';
import { EpicService } from '../services/epic.service';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.css']
})
export class BacklogPageComponent implements OnInit {
  tasks: Task[];
  stories: Story[];
  epics: Epic[];
  backlogItems: Backlog[] = [];
  displayedColumns = ['id', 'name', 'type', 'priority', 'progress'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private taskService: TaskService,
    private storyService: StoryService,
    private epicService: EpicService,
    authService: AuthService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.taskService.getAll()
      .subscribe(tasks => this.tasks = tasks,
        error => console.log('Error: ', error),
        () => this.storyService.getAll()
          .subscribe(stories => this.stories = stories,
            error => console.log('Error: ', error),
            () => this.epicService.getAll()
              .subscribe(epics => this.epics = epics,
                error => console.log('Error: ', error),
                () => this.taskToBacklog()
              )
          )
      );
  }

  taskToBacklog() {
    for (const task of this.tasks) {
      const progress = task.workedTime / task.workload * 100;
      const backlog = new Backlog(task.id, task.name, 'Task', task.description, task.priority, progress);
      this.backlogItems.push(backlog);
    }
    this.storyToBacklog();
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
    this.epicToBacklog();
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
    this.dataSource = new MatTableDataSource<Backlog>(this.backlogItems,);
    this.dataSource.sort = this.sort;
  }


}
