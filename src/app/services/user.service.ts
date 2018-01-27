import { Injectable } from '@angular/core';
import { User } from '../user/user';
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
export class UserService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/users', http);
  }

  /**
   * Alle Users auf der DB abfragen
   * @returns {Observable<User[]>}
   */
  getAll(): Observable<User[]> {
    return super.getAll()
      .map(userList => userList = userList
        .map(userDB => userDB = new User(userDB.UserID, userDB.Username, userDB.Password, userDB.Firstname, userDB.Lastname, userDB.Role)));
  }

  /**
   * Ein User anhand der ID abfragen
   * @returns {Observable<User>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Users
   */
  getById(id: number): Observable<User> {
    return super.getById(id)
      .map(userDB => userDB = new User(userDB.UserID, userDB.Username, userDB.Password, userDB.Firstname, userDB.Lastname, userDB.Role))
    //.catch(e => { console.log(e); return undefined; })
  }


  /**
   * User erstellen
   * User wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} User
   * @returns {Observable<User>}
   */
  create(user): Observable<User> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.UserId = user.id;
    transferObject.Username = user.username;
    transferObject.Password = user.password;
    transferObject.Firstname = user.firstname;
    transferObject.Lastname = user.lastname;
    transferObject.Role = user.role;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject))
      .map(objects => objects[0])
      .map(userDB => userDB = userDB ? new User(userDB.UserID, userDB.Username, userDB.Password, userDB.Firstname, userDB.Lastname, userDB.Role) : undefined);
  }

  /**
   * User bearbeiten
   * Das User in der DB mit der gleichen ID wird durch das gesendete User ersetzt.
   * Existiert kein User mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} User
   * @returns {Observable<User>}
   */
  update(user): Observable<User> {
    var transferObject: any = {};
    transferObject.UserID = user.id;
    transferObject.Username = user.username;
    transferObject.Password = user.password;
    transferObject.Firstname = user.firstname;
    transferObject.Lastname = user.lastname;
    transferObject.Role = user.role;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein User anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Users
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }


  /**
   * Ein User anhand des usernames abfragen
   * @returns {Observable<User>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Users
   */
  getByUsername(username: String): Observable<User> {
    const url = `${this.url}/username/${username}`;
    let result: Observable<any> = this.http.get<any[]>(url)
      .pipe(
      map(objects => objects[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} User username=${username}`);
      }),
      catchError(this.handleError<Object>(`getByUsername username=${username}`))
      );
    return result
      .map(userDB => userDB = userDB ? new User(userDB.UserID, userDB.Username, userDB.Password, userDB.Firstname, userDB.Lastname, userDB.Role) : undefined);
  }
}
