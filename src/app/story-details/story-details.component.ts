import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { ActivatedRoute } from '@angular/router';
import { Epic } from '../epic/epic';
import { EpicService } from '../services/epic.service';
import { Task } from '../task/task';
import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  story: Story;
  epic: Epic;
  tasks: Task[];
  assignedTasks: Task[];
  checkedTasks: Task[] = [];
  displayedColumns = ['Id', 'Name', 'EstTime', 'Add'];
  dataSource: any;
  constructor(private route: ActivatedRoute, private storyService: StoryService,
              private epicService: EpicService, private taskService: TaskService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getStory(this.id);
    this.getEpic(this.story.epicId);
    this.getTasks();
    this.getAssignedTasks(this.story.id);
    this.dataSource = new MatTableDataSource<Task>(this.tasks);
  }

  getStory(id: number) {
    this.storyService.getById(id)
      .subscribe( story => this.story = story);
  }

  getEpic(id: number) {
    this.epicService.getById(id)
      .subscribe( epic => this.epic = epic);
  }

  getAssignedTasks(storyId: number) {
    this.taskService.getByStoryId(storyId)
      .subscribe( tasks => this.assignedTasks = tasks);
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe( tasks => this.tasks = tasks);
  }

  check(task: Task) {
    let included = this.checkedTasks.includes(task);
    console.log('Included before: ' + included);
    if (included === true) {
      this.checkedTasks.splice(this.checkedTasks.indexOf(task), 1);
    }
    if (included === false) {
      this.checkedTasks.push(task);
    }
    included = this.checkedTasks.includes(task);
    console.log('Included after: ' + included);
  }

  // TODO: muss noch über den Service auf der DB geändert werden
  addTasks() {
    console.log('addTasks');
    console.log(this.checkedTasks);
    for (const task of this.checkedTasks) {
      task.storyId = this.story.id;
    }
  }

  delete() {
    this.storyService.delete(this.story.id);
  }
}
