import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Task } from '../task/task';

@Injectable()
export class TaskService {

  constructor() { }

  getAll(): Task[] {
    return TASKS;
  }

  create(task: Task) {
    
  }

  update(task: Task) {

  }

  delete(id: number) {
  }
}
