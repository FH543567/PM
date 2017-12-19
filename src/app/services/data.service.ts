import { Injectable } from '@angular/core';
import { EPIC, TASK, STORY } from './mockdata';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';

@Injectable()
export class DataService {

  constructor() { }

  getTasks(): Task[] {
    return TASK;
  }

  getStory(): Story[] {
    return STORY;
  }

  getEpic(): Epic[] {
    return EPIC;
  }
}
