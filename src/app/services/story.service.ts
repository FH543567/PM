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

  /**
   * Alle Storys abfragen
   * @returns {Observable<Story[]>}
   */
  getAll(): Observable<Story[]> {
    return of(STORIES);
  }

  /**
   * Eine Story anhand der ID abfragen
   * @param {number} id
   * @returns {Observable<Story>}
   */
  getById(id: number): Observable<Story> {
    for (let i = 0; i < STORIES.length; i++) {
      if (STORIES[i].id === id) {
        return of(STORIES[i]);
      }
    }
    return null;
  }

  /**
   * Alle Storys anhand der Epic ID abfragen
   * @param {number} epicId
   * @returns {Observable<Story[]>}
   */
  getByEpicId(epicId: number): Observable<Story[]> {
    const assignedStories: Story[] = [];
    for (const story of STORIES) {
      if (story.epicId === epicId) {
        assignedStories.push(story);
      }
    }
    return of(assignedStories);
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
