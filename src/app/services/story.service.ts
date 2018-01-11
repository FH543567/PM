import { Injectable } from '@angular/core';
import { STORIES } from './mockdata';
import { Story } from '../story/story';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TASKS } from './mockdata';
import { Task } from '../task/task';

@Injectable()
export class StoryService {
  tasks: Task[];
  constructor() { }

  getStories(): Observable<Story[]> {
    return of(STORIES);
  }

  getStory(id: number): Observable<Story> {
    for (let i = 0; i < STORIES.length; i++) {
      if (STORIES[i].id = id) {
        return of(STORIES[i]);
      }
    }
    return null;
  }

  getTasks(id: number): Observable<Task[]> {
    for (let i = 0; i < TASKS.length; i++) {
      if (TASKS[i].storyId = id) {
        this.tasks.push(TASKS[i]);
      }
    }
    return of(this.tasks);
  }

  create(story: Story): boolean {
    console.log('created');
    console.log('Name: ' + story.name);
    console.log('Description: ' + story.description);
    console.log('Priority: ' + story.priority);
    console.log('EpicID: ' + story.epicId);
    return true;
  }

  update(story: Story): boolean {
    console.log('updated');
    return true;
  }

  delete(id: number): boolean {
    console.log('deleted');
    return true;
  }
}
