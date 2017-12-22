import { Injectable } from '@angular/core';
import { EPIC, TASK, STORY } from './mockdata';
import { Task } from '../task/task';

@Injectable()
export class TaskService {

  constructor() { }

  getAll(): Task[] {
    return TASK;
  }

  create(task: Task) {
    
  }

  update(task: Task) {

  }

  delete(id: number) {
  }
}
