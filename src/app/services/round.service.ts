import { Injectable } from '@angular/core';
import { Round } from '../planningpoker-page/round';
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
export class RoundService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/rounds', http);
  }

  /**
   * Alle Rounds auf der DB abfragen
   * @returns {Observable<Round[]>}
   */
  getAll(): Observable<Round[]> {
    return super.getAll()
      .map(roundList => roundList = roundList
        .map(roundDB => roundDB = new Round(roundDB.RoundID, roundDB.PokerID, roundDB.Users, roundDB.Hours)));
  }

  /**
   * Ein Round anhand der ID abfragen
   * @returns {Observable<Round>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Rounds
   */
  getById(id: number): Observable<Round> {
    return super.getById(id)
      .map(roundDB => roundDB = new Round(roundDB.RoundID, roundDB.PokerID, roundDB.Users, roundDB.Hours))
    //.catch(e => { console.log(e); return undefined; })
  }


  /**
   * Round erstellen
   * Round wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Round
   * @returns {Observable<Round>}
   */
  create(round): Observable<Round> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.RoundId = round.id;
    transferObject.roundId = round.roundId;
    transferObject.users = JSON.stringify(round.users);
    transferObject.hours = JSON.stringify(round.hours);

    console.log("CREATE: " + JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject))
      .map(objects => objects[0])
      .map(roundDB => roundDB = roundDB ? new Round(roundDB.RoundID, roundDB.PokerID, roundDB.Users, roundDB.Hours) : undefined);
  }

  /**
   * Round bearbeiten
   * Das Round in der DB mit der gleichen ID wird durch das gesendete Round ersetzt.
   * Existiert kein Round mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Round
   * @returns {Observable<Round>}
   */
  update(round): Observable<Round> {
    var transferObject: any = {};
    transferObject.RoundID = round.id;
    transferObject.roundId = round.roundId;
    transferObject.users = round.users;
    transferObject.hours = round.hours;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Round anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Rounds
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }
}
