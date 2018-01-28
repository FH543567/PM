import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { ActivatedRoute, Router } from '@angular/router';
import { Epic } from '../epic/epic';
import { EpicService } from '../services/epic.service';
import { Task } from '../task/task';
import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  result = false;
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
              private epicService: EpicService, private taskService: TaskService,
              private dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getData();
    // this.getStory(this.id);
    // this.getEpic(this.story.epicId);
    // this.getTasks();
  }

  getData() {
    this.storyService.getById(this.id)
      .subscribe( story => this.story = story,
        error => console.log('Error: ', error),
        () => this.taskService.getByStoryId(this.story.id)
          .subscribe( assignedTasks => this.assignedTasks = assignedTasks,
            error => console.log('Error: ', error),
            () => this.taskService.getAll()
              .subscribe(tasks => this.tasks = tasks,
                error => console.log('Error: ', error),
                () => this.epicService.getById(this.story.epicId)
                  .subscribe( epic => this.epic = epic,
                    error => console.log('Error: ', error),
                    () => this.dataSource = new MatTableDataSource<Task>(this.tasks)
                  )
              )
          )
      );
  }

  getStory(id: number) {
    this.storyService.getById(id)
      .subscribe( story => this.story = story,
        error => console.log('Error: ', error),
        () => this.getAssignedTasks(this.story.id)
      );
  }

  getEpic(id: number) {
    this.epicService.getById(id)
      .subscribe( epic => this.epic = epic,
        error => console.log('Error: ', error)
      );
  }

  getAssignedTasks(storyId: number) {
    this.taskService.getByStoryId(storyId)
      .subscribe( tasks => this.assignedTasks = tasks,
        error => console.log('Error: ', error)
      );
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe( tasks => this.tasks = tasks,
        error => console.log('Error: ', error),
        () => this.dataSource = new MatTableDataSource<Task>(this.tasks)
      );
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
      this.taskService.update(task)
        .subscribe();
    }
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      height: '150px',
      width: '300px',
      data: { type: 'Story', name: this.story.name}
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
      this.storyService.delete(this.story.id)
        .subscribe(empty => this.result = false,
          error => console.log('Error: ', error),
          () => this.router.navigate(['../../../backlog'])
        );
    }
  }
}
