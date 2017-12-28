import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Epic } from '../epic/epic';

@Injectable()
export class EpicService {

  constructor() { }

  getAll(): Epic[] {
    return EPICS;
  }

  create(epic: Epic) {
    
  }

  update(epic: Epic) {

  }

  delete(id: number) {
  }

}
