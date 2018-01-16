import { Injectable } from '@angular/core';
import { EPICS, TASKS, STORIES, SPRINTS } from './mockdata';
import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../user/user';
import { Sprint } from '../sprint/sprint';
import { Backlog } from '../backlog/backlog';
import { Poker } from '../planningpoker-page/poker';
import { Message } from '../planningpoker-page/Message';
import { Round } from '../planningpoker-page/round';

@Injectable()
export class DataService {

  // DEFAULT VALUES FOR TESTING
  // --------------- daten müssen später vom Server geholt werden ---------------
  poker: Poker = new Poker(1, 'exampleTask', 'this is an Example Task with a lot of text and bla and you have to see whats ' +
  'going on and the bla bla bla is very important to blablablablabla', [
    new Round(['Hans', 'Peter', 'Ute'], [3, 5, 6]),
    new Round(['Hans', 'Peter', 'Ute'], [4, 5, 6]),
    new Round(['Hans', 'Peter', 'Ute'], [4, 5, 5]),
    new Round(['Hans', 'Peter', 'Ute'], [5, 5, 5])
  ]);
  chat: Message[] = [
    new Message('Peter', 'ich finde das doof diesen langen text der testen soll ob ein umbruch funktioniert'),
    new Message('Ute', 'beispieltext'),
    new Message('Hannes', 'Hello World!')
  ];
  // --------------------------------------------------------------------------------
  constructor() { }

  // TODO: Service für Poker, Burndown, Chat

  // Methode für die Regestration eines neuen Users im Serve
  register(user: User): boolean {
    console.log('username:', user.username);
    console.log('password:', user.password);
    console.log('firstname:', user.firstname);
    console.log('lastname:', user.lastname);
    // TODO: Rollenwert für eine Übergabe an die DB auslesen
    console.log('role:', user.role);
    return true;
  }

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
   * @param {number} estimate
   */
  enterEstimate(estimate: number): void {
    this.poker.roundData[this.poker.roundData.length - 1].users.push(localStorage.getItem('username'));
    this.poker.roundData[this.poker.roundData.length - 1].hours.push(estimate);
  }

  /**
   * startet eine neue Runde
   * @param {Round} round
   */
  newRound(round: Round): void {
    this.poker.roundData.push(new Round());
  }

  /**
   * sendet eine neue Nachticht in den Chat
   * @param {string} text
   */
  addMessage(text: string ) {
    this.chat.push(new Message(localStorage.getItem('username'), text));
  }
  /*
  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  getStories(): Observable<Story[]> {
    return of(STORIES);
  }

  getEpics(): Observable<Epic[]> {
    return of(EPICS);
  }

  getSprints(): Observable<Sprint[]> {
    return of(SPRINTS);
  }
  */
}
