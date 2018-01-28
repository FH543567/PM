import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpicService } from '../services/epic.service';
import { Epic } from '../epic/epic';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Story } from '../story/story';
import { StoryService } from '../services/story.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.css']
})
export class EpicDetailsComponent implements OnInit {
  result = false;
  id: number;
  private sub: any;
  epic: Epic;
  stories: Story[];
  assignedStories: Story[];
  checkedStories: Story[] = [];
  displayedColumns = ['Id', 'Name', 'EstTime', 'Add'];
  dataSource: any;
  constructor(private route: ActivatedRoute,
              private epicService: EpicService,
              private storyService: StoryService,
              private dialog: MatDialog,
              public router: Router,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData();
  }

  getData() {
    this.epicService.getById(this.id)
      .subscribe( epic => this.epic = epic,
        error => console.log('Error: ' + error),
        () => this.storyService.getByEpicId(this.epic.id)
          .subscribe( assignedStories => this.assignedStories = assignedStories,
            error => console.log('Error: ', error),
            () => this.storyService.getAll()
              .subscribe( stories => this.stories = stories,
                error => console.log('Error: ', error),
                () => this.dataSource = new MatTableDataSource<Story>(this.stories)
                )
            )
    );
  }

  check(story: Story) {
    const included = this.checkedStories.includes(story);
    if (included === true) {
      this.checkedStories.splice(this.checkedStories.indexOf(story), 1);
    }
    if (included === false) {
      this.checkedStories.push(story);
    }
  }

  addStories() {
    for (const story of this.checkedStories) {
      story.epicId = this.epic.id;
      this.storyService.update(story)
        .subscribe();
    }
    this.ngOnInit();
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      height: '150px',
      width: '300px',
      data: { type: 'Epic', name: this.epic.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.result = true;
      }
    }, error => console.log('Error: ', error),
      () => this.delete());
  }

  delete() {
    if (this.result === true) {
      this.epicService.delete(this.epic.id)
        .subscribe(empty => this.result = false,
          error => console.log('Error: ', error),
          () => this.router.navigate(['../../../backlog'])
        );
    }
  }
}
