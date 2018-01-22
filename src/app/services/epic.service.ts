import { Injectable } from '@angular/core';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DataService } from './data.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class EpicService {

  constructor() { }

  getAll(): Observable<Epic[]> {
    return of(EPICS);
  }

  getById(id: number): Observable<Epic> {
    for (let i = 0; i < EPICS.length; i++) {
      if (EPICS[i].id === id) {
        return of(EPICS[i]);
      }
    }
    return null;
  }

  create(epic: Epic): boolean {
    console.log('created');
    console.log('Name: ' + epic.name);
    console.log('Description: ' + epic.description);
    console.log('Priority: ' + epic.priority);
    return true;
  }

  update(epic: Epic): boolean {
    console.log('updated');
    return true;
  }

  delete(id: number): boolean {
    console.log('deleted');
    return true;
  }

}
