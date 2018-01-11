import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../user/user';
import { Sprint } from '../sprint/sprint';
import { Backlog } from '../backlog/backlog';

@Injectable()
export class DataService {

  constructor() { }

  // Methode für die Regestration eines neuen Users im Serve
  register(user: User): boolean {
    console.log('username:', user.username);
    console.log('password:', user.password);
    console.log('firstname:', user.firstname);
    console.log('lastname:', user.lastname);
    console.log('role:', user.role);
    return true;
  }

  createBacklog(backlog: Backlog): boolean {
    console.log('id', backlog.id);
    console.log('name', backlog.name);
    console.log('description', backlog.description);
    console.log('priority', backlog.priority);
    console.log('type', backlog.type);
    return true;
  }

  /*
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
  */
}
