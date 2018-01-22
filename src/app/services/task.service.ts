import { Injectable } from '@angular/core';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DtoService } from './dto.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService extends DtoService {
  
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/taskss', http);
  }

  getAll(): Observable<Task[]> {
    return super.getAll()
      .map(taskList => taskList = taskList
        .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }

  getById(id: number): Observable<Task> {
    return super.getById(id)
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID))
  }

  create(task): Observable<Task> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.TaskId = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  update(task): Observable<Task> {
    var transferObject: any = {};
    transferObject.TaskID = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  delete(id: number): Observable<number> {
    return super.delete(id);
  }

}
