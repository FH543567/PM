import { Injectable } from '@angular/core';
import { Message } from '../planningpoker-page/message';
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
export class MessageService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/messages', http);
  }

  /**
   * Alle Messages auf der DB abfragen
   * @returns {Observable<Message[]>}
   */
  getAll(): Observable<Message[]> {
    return super.getAll()
      .map(messageList => messageList = messageList
        .map(messageDB => messageDB = new Message(messageDB.MessageID, messageDB.User, messageDB.Text)));
  }

  /**
   * Ein Message anhand der ID abfragen
   * @returns {Observable<Message>} returnt 'undefined' wenn id nicht gefunden wurde
   * @param id ID des gesuchten Messages
   */
  getById(id: number): Observable<Message> {
    return super.getById(id)
      .map(messageDB => messageDB = new Message(messageDB.MessageID, messageDB.User, messageDB.Text))
    //.catch(e => { console.log(e); return undefined; })
  }


  /**
   * Message erstellen
   * Message wird ohne ID an den Server geschickt (ID wird einfach ignoriert)
   * @param {resource} Message
   * @returns {Observable<Message>}
   */
  create(message): Observable<Message> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.MessageId = message.id;
    transferObject.User = message.user;
    transferObject.Text = message.text;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject))
      .map(objects => objects[0])
      .map(messageDB => messageDB = messageDB ? new Message(messageDB.MessageID, messageDB.User, messageDB.Text) : undefined);
  }

  /**
   * Message bearbeiten
   * Das Message in der DB mit der gleichen ID wird durch das gesendete Message ersetzt.
   * Existiert kein Message mit dieser ID in der DB, wird ein neues erstellt.
   * @param {resource} Message
   * @returns {Observable<Message>}
   */
  update(message): Observable<Message> {
    var transferObject: any = {};
    transferObject.MessageID = message.id;
    transferObject.User = message.user;
    transferObject.Text = message.text;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  /**
   * Ein Message anhand der ID löschen
   * @returns {Observable<number>}
   * @param id ID des zu löschenden Messages
   */
  delete(id: number): Observable<number> {
    return super.delete(id);
  }
}
