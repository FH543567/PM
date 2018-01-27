import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { UserService } from './user.service';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../user/user';
import { Sprint } from '../sprint/sprint';
import { Backlog } from '../backlog/backlog';
import { Poker } from '../planningpoker-page/poker';
import { Message } from '../planningpoker-page/message';
import { Round } from '../planningpoker-page/round';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class DataService {

  // DEFAULT VALUES FOR TESTING
  // --------------- daten müssen später vom Server geholt werden ---------------
  poker: Poker = new Poker(1, 'exampleTask', 'this is an Example Task with a lot of text and bla and you have to see whats ' +
    'going on and the bla bla bla is very important to blablablablabla', [
      new Round(1, ['Hans', 'Peter', 'Ute'], [3, 5, 6]),
      new Round(2, ['Hans', 'Peter', 'Ute'], [4, 5, 6]),
      new Round(3, ['Hans', 'Peter', 'Ute'], [4, 5, 5]),
      new Round(4, ['Hans', 'Peter', 'Ute'], [5, 5, 5])
    ]);
  chat: Message[] = [
    new Message(1, 'Peter', 'ich finde das doof diesen langen text der testen soll ob ein umbruch funktioniert'),
    new Message(2, 'Ute', 'beispieltext'),
    new Message(3, 'Hannes', 'Hello World!')
  ];
  // --------------------------------------------------------------------------------
  constructor() { }

  // TODO: Service für Poker, Burndown, Chat

  // Methode für die Registrierung eines neuen Users im Server
  /**
  * @deprecated nicht mehr Benutzen, da keine Verbindung zur DB!
  */
  register(user: User): boolean {
    console.log('username:', user.username);
    console.log('password:', user.password);
    console.log('firstname:', user.firstname);
    console.log('lastname:', user.lastname);
    console.log('role:', user.role);
    return true;
  }

  //TODO: Wird das noch gebraucht?
  createBacklog(backlog: Backlog): boolean {
    console.log('id', backlog.id);
    console.log('name', backlog.name);
    console.log('description', backlog.description);
    console.log('priority', backlog.priority);
    console.log('type', backlog.type);
    return true;
  }

  /**
   * Stellt das Poker objekt zur verfügung
   * TODO: Serververbidnung
   * @returns {Poker}
   */
  getPoker(): Poker {
    return this.poker;

  }

  /**
   * stellt das Chat objekt zur verfügung
   * TODO: Serververbindung
   * @returns {Message[]}
   */
  getMessages(): Message[] {
    return this.chat;
  }

  /**
   * fügt der aktuellen runde eine neue schätzung durch einen User hinzu
   * wenn bereits eine schätzung von diesem user existiert passiert nichts
   *
   * @param {number} estimate
   */
  enterEstimate(estimate: number): void {
    console.log(this.poker);
    if ( estimate !== undefined && !this.hasPokerEnded() ) {
      // Erste Eingabe einer runde:
      // TODO: Länge bei leerem array ist 0 also auf 0 prüfen und abfangen
      if (this.poker.roundData[this.poker.roundData.length - 1].users === undefined) {
        this.poker.roundData[this.poker.roundData.length - 1].users.push(localStorage.getItem('username'));
        this.poker.roundData[this.poker.roundData.length - 1].hours.push(estimate);
        // TODO: Daten zum Server schicken
      }else {
        // Wenn schon eine eingabe diese runde gemacht wurde keine akzeptieren
        let temp = false;
        for ( const username of this.poker.roundData[this.poker.roundData.length - 1].users) {
          if (username === localStorage.getItem('username')) {
            temp = true;
          }
        }
        if (!temp) {
          this.poker.roundData[this.poker.roundData.length - 1].users.push(localStorage.getItem('username'));
          this.poker.roundData[this.poker.roundData.length - 1].hours.push(estimate);
          // TODO: Daten zum Server schicken
        }
      }
    }
  }

  hasPokerEnded(): boolean {
    if (this.poker.roundData.length >= 2) {
      // prüfen ob sich eine von einer anderen zahl unterscheidet
      const est = this.poker.roundData[this.poker.roundData.length - 2].hours[0];
      for ( const estimate of this.poker.roundData[this.poker.roundData.length - 2].hours) {
        // console.log('Round ' + (this.poker.roundData.length - 1) + ' ' + estimate + ' !== ' + est);
        if (estimate !== est) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * startet eine neue Runde
   * @param {Round} round
   */
  newRound(): void {
    // wenn noch keine eingabe gemacht wird soll keine neue runde starten
    if (this.poker.roundData[this.poker.roundData.length - 1].users !== undefined) {
      if (this.poker.roundData[this.poker.roundData.length - 1].users.length >= 1) {
        this.poker.roundData.push(new Round(0, new Array<string>(), new Array<number>()));
      }
    }
  }

  /**
   * sendet eine neue Nachticht in den Chat
   * @param {string} text
   */
  addMessage(text: string ) {
    if (text !== '') {
      this.chat.push(new Message(0, localStorage.getItem('username'), text));
    }
  }
}
