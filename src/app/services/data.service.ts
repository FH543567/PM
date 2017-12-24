import { Injectable } from '@angular/core';
import { EPIC, TASK, STORY } from './mockdata';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { User } from '../user/user';

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
