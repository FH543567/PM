import { Injectable } from '@angular/core';
import { TASKS } from './mockdata';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  getTask(id: number): Observable<Task> {
    for (let i = 0; i < TASKS.length; i++) {
      if (TASKS[i].id = id) {
        return of(TASKS[i]);
      }
    }
    return null;
  }

  create(task: Task) {
  }

  update(task: Task) {
  }

  delete(id: number) {
  }
}
