import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Sprint } from '../sprint/sprint';

@Injectable()
export class DataService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  getStories(): Observable<Story[]> {
    return of(STORIES);
  }

  getEpics(): Observable<Epic[]> {
    return of(EPICS);
  }

  getSprints(): Observable<Sprint[]> {
    return of(SPRINTS);
  }
}
