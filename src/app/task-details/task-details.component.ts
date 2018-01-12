import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../task/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task;
  private sub: any;
  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    let id: number;
    this.sub = this.route.params.subscribe(params => {
      id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getTask(id);
  }

  getTask(id: number) {
    this.taskService.getTask(id)
      .subscribe( task => this.task = task);
  }

}
