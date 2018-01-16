import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpicService } from '../services/epic.service';
import { Epic } from '../epic/epic';
import { MatTableDataSource } from '@angular/material';
import { Story } from '../story/story';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.css']
})
export class EpicDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  epic: Epic;
  stories: Story[];
  assignedStories: Story[];
  checkedStories: Story[] = [];
  displayedColumns = ['Id', 'Name', 'EstTime', 'Add'];
  dataSource: any;
  constructor(private route: ActivatedRoute, private epicService: EpicService, private storyService: StoryService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getEpic(this.id);
    this.getStories();
    this.getAssignedStories(this.epic.id);
    this.dataSource = new MatTableDataSource<Story>(this.stories);
  }

  getEpic(id: number) {
    console.log('getEpic');
    console.log('ID: ' + id);
    this.epicService.getById(id)
      .subscribe( epic => this.epic = epic);
    console.log('Name: ' + this.epic.name);
  }

  getStories() {
    this.storyService.getAll()
      .subscribe( stories => this.stories = stories);
  }

  getAssignedStories(epicId: number) {
    this.storyService.getByEpicId(epicId)
      .subscribe( stories => this.assignedStories = stories);
  }

  check(story: Story) {
    let included = this.checkedStories.includes(story);
    console.log('Included before: ' + included);
    if (included === true) {
      this.checkedStories.splice(this.checkedStories.indexOf(story), 1);
    }
    if (included === false) {
      this.checkedStories.push(story);
    }
    included = this.checkedStories.includes(story);
    console.log('Included after: ' + included);
  }

  // TODO: muss noch über den Service auf der DB geändert werden
  addTasks() {
    console.log('addTasks');
    console.log(this.checkedStories);
    for (const task of this.checkedStories) {
      task.epicId = this.epic.id;
    }
  }
  
  delete() {
    this.epicService.delete(this.epic.id);
  }
}
