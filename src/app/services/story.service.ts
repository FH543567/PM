import { Injectable } from '@angular/core';
import { EPIC, TASK, STORY } from './mockdata';
import { Story } from '../story/story';

@Injectable()
export class StoryService {

  constructor() { }
  
  getAll(): Story[] {
    return STORY;
  }

  create(story: Story) {

  }

  update(story: Story) {
    
  }

  delete(id: number) {
  }
}
