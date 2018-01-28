import { Injectable } from '@angular/core';
import { Task } from '../task/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DtoService } from './dto.service';
import { HttpClient } from '@angular/common/http';
//Für nicht-vererbte http-requests:
import { catchError, map, tap } from 'rxjs/operators';

/**
 * Mapped den Inhalt der HTTP-Requests
 * Bei Änderungen von Variablen-Namen in der Datenbank oder in den DTO's muss das Mapping hier angepasst werden.
 */
@Injectable()
export class TaskService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/tasks', http);
  }

/**
   * Alle Tasks auf der DB abfragen
   * @returns {Observable<Task[]>}
   */
  getAll(): Observable<Task[]> {
    return super.getAll()
      .map(taskList => taskList = taskList
        .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }

   /**
   * Ein Task anhand der ID abfragen
   * @returns {Observable<Task>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Tasks
   */
  getById(id: number): Observable<Task> {
    return super.getById(id)
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority, taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID))
  }

  /**
   * Task erstellen
   * Task wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Task
   * @returns {Observable<Task>}
   */
  create(task): Observable<Task> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.TaskId = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));
  }

  /**
   * Task bearbeiten
   * Das Task in der DB mit der gleichen ID wird durch das gesendete Task ersetzt.
   * Existiert kein Task mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Task
   * @returns {Observable<Task>}
   */
  update(task): Observable<Task> {
    var transferObject: any = {};
    transferObject.TaskID = task.id;
    transferObject.Name = task.name;
    transferObject.Description = task.description;
    transferObject.Priority = task.priority;
    transferObject.Workload = task.workload;
    transferObject.WorkedTime = task.workedTime;
    transferObject.StoryID = task.storyId;
    transferObject.SprintID = task.sprintId;
    transferObject.UserID = task.userId;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Task anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Tasks
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }

  /**
   * Tasks anhand der StoryID abfragen
   * @returns {Observable<Task[]>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID der zugehörigen Story
   */
  getByStoryId(id: number): Observable<Task[]> {
    const url = `${this.url}/byStory/${id}`;

    const result: Observable<any[]> = this.http.get<Task[]>(url)
      .pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Object id=${id}`);
      }),
      catchError(this.handleError('getAll', []))
      );
    return result.map(taskList => taskList = taskList
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority,
        taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }

  /**
   * Tasks anhand der SprintID abfragen
   * @returns {Observable<Task[]>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des zugehörigen Sprints
   */
  getBySprintId(id: number): Observable<Task[]> {
    const url = `${this.url}/bySprint/${id}`;

    const result: Observable<any[]> = this.http.get<Task[]>(url)
      .pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Object id=${id}`);
      }),
      catchError(this.handleError('getAll', []))
      );
    return result.map(taskList => taskList = taskList
      .map(taskDB => taskDB = new Task(taskDB.TaskID, taskDB.Name, taskDB.Description, taskDB.Priority,
        taskDB.Workload, taskDB.WorkedTime, taskDB.StoryID, taskDB.SprintID, taskDB.UserID)));
  }
}
