import { Injectable } from '@angular/core';
import { Story } from '../story/story';
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
export class StoryService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/stories', http);
  }

  /**
   * Alle Stories auf der DB abfragen
   * @returns {Observable<Story[]>}
   */
  getAll(): Observable<Story[]> {
    return super.getAll()
      .map(storyList => storyList = storyList
        .map(storyDB => storyDB = new Story(storyDB.StoryID, storyDB.Name, storyDB.Description, storyDB.Priority, storyDB.EpicId)));
  }

  /**
   * Ein Story anhand der ID abfragen
   * @returns {Observable<Story>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Stories
   */
  getById(id: number): Observable<Story> {
    return super.getById(id)
      .map(storyDB => storyDB = new Story(storyDB.StoryID, storyDB.Name, storyDB.Description, storyDB.Priority, storyDB.EpicId))
        //.catch(e => { console.log(e); return undefined; })
  }

  /**
   * Story erstellen
   * Story wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Story
   * @returns {Observable<Story>}
   */
  create(story): Observable<Story> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.StoryId = story.id;
    transferObject.Name = story.name;
    transferObject.Description = story.description;
    transferObject.Priority = story.priority;
    transferObject.EpicId = story.epicId;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  /**
   * Story bearbeiten
   * Das Story in der DB mit der gleichen ID wird durch das gesendete Story ersetzt.
   * Existiert kein Story mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Story
   * @returns {Observable<Story>}
   */
  update(story): Observable<Story> {
    var transferObject: any = {};
    transferObject.StoryID = story.id;
    transferObject.Name = story.name;
    transferObject.Description = story.description;
    transferObject.Priority = story.priority;
    transferObject.EpicId = story.epicId;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Story anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Stories
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }

  /**
   * Stories anhand der EpicID abfragen
   * @returns {Observable<Story[]>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des zugehörigen Epics
   */
  getByEpicId(id: number): Observable<Story[]> {
    const url = `${this.url}/byEpic/${id}`;

    let result: Observable<any[]> = this.http.get<Story[]>(url)
      .pipe(
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} Object id=${id}`);
      }),
      catchError(this.handleError('getAll', []))
      );
    return result.map(storyList => storyList = storyList
      .map(storyDB => storyDB = new Story(storyDB.StoryID, storyDB.Name, storyDB.Description, storyDB.Priority, storyDB.EpicId)));
  }
}
