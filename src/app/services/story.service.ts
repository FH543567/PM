import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES } from './mockdata';
import { Story } from '../story/story';

@Injectable()
export class StoryService {

  constructor() { }
  
  getAll(): Story[] {
    return STORIES;
  }

  create(story: Story) {

  }

  update(story: Story) {
    
  }

  delete(id: number) {
  }
}
