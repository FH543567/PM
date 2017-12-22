import { Injectable } from '@angular/core';
import { EPIC, TASK, STORY } from './mockdata';
import { Epic } from '../epic/epic';

@Injectable()
export class EpicService {

  constructor() { }

  getAll(): Epic[] {
    return EPIC;
  }

  create(epic: Epic) {
    
  }

  update(epic: Epic) {

  }

  delete(id: number) {
  }

}
