import { Injectable } from '@angular/core';
import { SPRINTS } from './mockdata';
import { Sprint } from '../sprint/sprint';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SprintService {

  constructor() { }

  getSprints(): Observable<Sprint[]> {
    return of(SPRINTS);
  }

  getSprint(id: number): Observable<Sprint> {
    for (let i = 0; i < SPRINTS.length; i++) {
      if (SPRINTS[i].id = id) {
        return of(SPRINTS[i]);
      }
    }
    return null;
  }

  create(epic: Sprint) {
  }

  update(epic: Sprint) {
  }

  delete(id: number) {
  }
}
