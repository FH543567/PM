import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { USERS } from './mockdata';

@Injectable()
export class UserService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUser(id: number): Observable<User> {
    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].id = id) {
        return of(USERS[i]);
      }
    }
    return null;
  }

  create(task: User) {
  }

  update(task: User) {
  }

  delete(id: number) {
  }
}
