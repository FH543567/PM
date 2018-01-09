import { Injectable } from '@angular/core';
import { EPICS } from './mockdata';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EpicService {

  constructor() { }

  getEpics(): Observable<Epic[]> {
    return of(EPICS);
  }

  getEpic(id: number): Observable<Epic> {
    for (let i = 0; i < EPICS.length; i++) {
      if (EPICS[i].id = id) {
        return of(EPICS[i]);
      }
    }
    return null;
  }

  create(epic: Epic) {
  }

  update(epic: Epic) {
  }

  delete(id: number) {
  }

}
