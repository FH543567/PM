import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Sprint } from '../sprint/sprint';

@Injectable()
export class SprintService {

  constructor() { }

  getAll(): Sprint[] {
    return SPRINTS;
  }

  create(epic: Sprint) {
  }

  update(epic: Sprint) {

  }

  delete(id: number) {
  }
}
