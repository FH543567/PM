import { Injectable } from '@angular/core';
import { Sprint } from '../sprint/sprint';
import { HistoryEntry } from '../chart-page/historyEntry';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DtoService } from './dto.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SprintService extends DtoService {

  constructor(http: HttpClient) {
    super('/api/sprints', http);
  }

  /**
   * Alle Sprints auf der DB abfragen
   * @returns {Observable<Sprint[]>}
   */
  getAll(): Observable<Sprint[]> {
    return super.getAll()
      .map(sprintList => sprintList = sprintList
        .map(sprintDB => sprintDB = new Sprint(sprintDB.SprintID, sprintDB.Name, sprintDB.Description, sprintDB.AvailableTime, new Date(sprintDB.StartDate), new Date(sprintDB.EndDate))));
  }

  /**
   * Ein Sprint anhand der ID abfragen
   * @returns {Observable<Sprint>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Sprints
   */
  getById(id: number): Observable<Sprint> {
    return super.getById(id)
      .map(sprintDB => sprintDB = new Sprint(sprintDB.SprintID, sprintDB.Name, sprintDB.Description, sprintDB.AvailableTime, new Date(sprintDB.StartDate), new Date(sprintDB.EndDate)));
  }

  /**
   * Sprint erstellen
   * Sprint wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Sprint
   * @returns {Observable<Sprint>}
   */
  create(sprint): Observable<Sprint> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.SprintId = sprint.id;
    transferObject.Name = sprint.name;
    transferObject.Description = sprint.description;
    transferObject.AvailableTime = sprint.availableTime;
    transferObject.StartDate = sprint.startDate;
    transferObject.EndDate = sprint.endDate;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  /**
   * Sprint bearbeiten
   * Das Sprint in der DB mit der gleichen ID wird durch das gesendete Sprint ersetzt.
   * Existiert kein Sprint mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Sprint
   * @returns {Observable<Sprint>}
   */
  update(sprint): Observable<Sprint> {
    var transferObject: any = {};
    transferObject.SprintID = sprint.id;
    transferObject.Name = sprint.name;
    transferObject.Description = sprint.description;
    transferObject.AvailableTime = sprint.availableTime;
    transferObject.StartDate = sprint.startDate;
    transferObject.EndDate = sprint.endDate;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Sprint anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Sprints
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }

  /**
   * Alle Historyeinträge auf der DB abfragen
   * Nach date aufsteigend sortiert
   * @returns {Observable<HistoryEntry[]>}
   */
  getFullHistory(): Observable<HistoryEntry[]> {
    let tmpUrl: string = this.url;
    this.url = "/api/history";
    let result: Observable<HistoryEntry[]> = super.getAll()
      .map(historyList => historyList = historyList
        .map(historyDB => historyDB = new HistoryEntry(historyDB.Sprint, new Date(historyDB.Date), historyDB.WorkRemaining)));
    //Reset URL
    this.url = tmpUrl;
    return result;
  }
}
