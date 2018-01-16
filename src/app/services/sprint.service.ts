import { Injectable } from '@angular/core';
import { SPRINTS } from './mockdata';
import { Sprint } from '../sprint/sprint';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SprintService {

  constructor() { }

  // TODO: umbenennen getAll()
  getSprints(): Observable<Sprint[]> {
    return of(SPRINTS);
  }

  // TODO: umbenennen getById()
  getSprint(id: number): Observable<Sprint> {
    for (let i = 0; i < SPRINTS.length; i++) {
      if (SPRINTS[i].id === id) {
        return of(SPRINTS[i]);
      }
    }
    return null;
  }

  create(sprint: Sprint) {
    console.log('Create Sprint');
    console.log('Name: ' + sprint.name);
    console.log('Description: ' + sprint.description);
    console.log('Available time: ' + sprint.availableTime);
    console.log('Start date: ' + sprint.startDate);
    console.log('End date: ' + sprint.endDate);
  }

  update(sprint: Sprint) {
  }

  delete(id: number) {
  }
}
