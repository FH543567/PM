import { Injectable } from '@angular/core';
import { TASKS } from './mockdata';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TaskService {

  constructor() { }

  /**
   * Alle Tasks der DB abfragen
   * @returns {Observable<Task[]>}
   */
  // TODO: umbenennen in getAll()
  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  /**
   * Einen Task anhand der ID abfragen
   * @param {number} taskId
   * @returns {Observable<Task>}
   */
  // TODO: umbenennen in getById()
  getTask(taskId: number): Observable<Task> {
    for (let i = 0; i < TASKS.length; i++) {
      if (TASKS[i].id === taskId) {
        return of(TASKS[i]);
      }
    }
    return null;
  }

  /**
   * Alle Tasks anhand einer Story ID erhalten
   * @param {number} storyId
   * @returns {Observable<Task[]>}
   */
  // TODO: umbenenen in getByStoryId()
  getAssignedTasks(storyId: number): Observable<Task[]> {
    const assignedTasks: Task[] = [];
    for (const task of TASKS) {
      if (task.storyId === storyId) {
        assignedTasks.push(task);
      }
    }
    return of(assignedTasks);
  }

  /**
   * Task erstellen
   * Objekt wird ohne ID an den Server geschickt
   * @param {Task} task
   * @returns {boolean}
   */
  create(task: Task): boolean {
    console.log('created');
    console.log('Name: ' + task.name);
    console.log('Description: ' + task.description);
    console.log('Workload: ' + task.workload);
    console.log('StoryID: ' + task.storyId);
    console.log('Priority: ' + task.priority);
    console.log('UserID: ' + task.userId);
    return true;
  }

  /**
   * Task verändern
   * @param {Task} task
   * @returns {boolean}
   */
  update(task: Task): boolean {
    console.log('update');
    return true;
  }

  /**
   * Task löschen
   * @param {number} id
   * @returns {boolean}
   */
  delete(id: number): boolean {
    console.log('delete');
    return true;
  }
}
