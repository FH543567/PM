import {ChangeDetectorRef, Injectable} from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {JsonConvert, JsonObject, JsonProperty} from 'json2typescript';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router, private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    if (localStorage.getItem('username') != null) {
      return true;
    } else {
      return false;
    }
  }

  get isScrumMaster(): boolean {
    if (localStorage.getItem('role') === '0') {
      return true;
    } else {
      return false;
    }
  }

  get isDeveloper(): boolean {
    if (localStorage.getItem('role') === '1') {
      return true;
    } else {
      return false;
    }
  }

  get isProductOwner(): boolean {
    if (localStorage.getItem('role') === '2') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Request an Server, ob userToVerify existiert
   * @param {User} userToVerify
   */
  login(userToVerify: User) {
    if (userToVerify.username !== '' && userToVerify.password !== '') {
        this.userService.getByUsername(userToVerify.username).subscribe(loginResult => this.setLogin(userToVerify, loginResult));
    }
  }

  /**
   * Überprüft Login-Daten und wenn erfolgreich - setzt LocalStorage
   * Bei mehreren Usern wird nur der oberste in der DB genommen => kann zu Fehlern (insb. in der PW-Überprüfung) führen
   *
   * @param {User} userToVerify
   * @param {User} loginResult
   */
  setLogin(userToVerify: User, loginResult: User) {
    if (!loginResult) {
      // result ist undefined
      console.error('Fehler beim Login: Username konnte nicht gefunden werden.');
    } else if (userToVerify.password !== loginResult.password) {
      // Password stimmt nicht überein
      console.error('Fehler beim Login: Das angegebene Passwort ist falsch.');
    } else {
      // überprüfung erfolgreich
      this.loggedIn.next(true);
      localStorage.setItem('username', loginResult.username);
      console.log(loginResult);
      localStorage.setItem('role',  loginResult.role + '');
      this.router.navigate(['/backlog']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}


  /*
  login(user: User) {

    // testdaten
   const users = [
      new User(1, 'admin', 'admin', 'hans1', 'peter1', 1),
      new User(2, 'User2', 'geheim', 'hans2', 'peter2', 2),
      new User(3, 'User3', 'geheim', 'hans3', 'peter3', 3)
    ];
    // vergleich der logindaten später erfolgt überprüfung durch abfragen von der datenbank
    if (users[0].username === user.username && user.password === users[0].password) {
      this.setUser(users[0]);
    }else
    if (users[1].username === user.username && user.password === users[1].password) {
      this.setUser(users[1]);
    }else
    if (users[2].username === user.username && user.password === users[2].password) {
      this.setUser(users[2]);
      this.router.navigate(['../scrumboard']);
    } else { console.log('login hat nicht geklappt'); }
  }

  private setUser(user: User) {
    localStorage.setItem('currUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('currUser');
    this.router.navigate(['../login']);
  }
}
*/
