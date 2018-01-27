import { Injectable } from '@angular/core';
import { Poker } from '../planningpoker-page/poker';
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
export class PokerService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/pokers', http);
  }

  /**
   * Alle Pokers auf der DB abfragen
   * ACHTUNG: roundData wird nicht mit persistiert!
   * @returns {Observable<Poker[]>}
   */
  getAll(): Observable<Poker[]> {
    return super.getAll()
      .map(pokerList => pokerList = pokerList
        .map(pokerDB => pokerDB = new Poker(pokerDB.PokerID, pokerDB.Label, pokerDB.description, pokerDB.Firstname)));
  }

  /**
   * Ein Poker anhand der ID abfragen
   * ACHTUNG: roundData wird nicht mit persistiert!
   * @returns {Observable<Poker>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Pokers
   */
  getById(id: number): Observable<Poker> {
    return super.getById(id)
      .map(pokerDB => pokerDB = new Poker(pokerDB.PokerID, pokerDB.Label, pokerDB.description, pokerDB.Firstname))
    //.catch(e => { console.log(e); return undefined; })
  }


  /**
   * Poker erstellen
   * Poker wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * ACHTUNG: roundData wird nicht mit persistiert!
   * @param {resource} Poker
   * @returns {Observable<Poker>}
   */
  create(poker): Observable<Poker> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.PokerId = poker.id;
    transferObject.Label = poker.label;
    transferObject.Description = poker.description;
    transferObject.RoundData = poker.roundData;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject))
      .map(objects => objects[0])
      .map(pokerDB => pokerDB = pokerDB ? new Poker(pokerDB.PokerID, pokerDB.Label, pokerDB.description, pokerDB.Firstname) : undefined);
  }

  /**
   * Poker bearbeiten
   * Das Poker in der DB mit der gleichen ID wird durch das gesendete Poker ersetzt.
   * Existiert kein Poker mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Poker
   * @returns {Observable<Poker>}
   */
  update(poker): Observable<Poker> {
    var transferObject: any = {};
    transferObject.PokerID = poker.id;
    transferObject.Label = poker.label;
    transferObject.Description = poker.description;
    transferObject.RoundData = poker.roundData;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Poker anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Pokers
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }
}
