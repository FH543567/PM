import { Injectable } from '@angular/core';
import { STORIES } from './mockdata';
import { Story } from '../story/story';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StoryService {

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

  create(story: Story) {
  }

  update(story: Story) {
  }

  delete(id: number) {
  }
}
