import {ChangeDetectorRef, Injectable} from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {JsonConvert, JsonObject, JsonProperty} from 'json2typescript';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): boolean {
    if (localStorage.getItem('username') != null) {
      return true;
    } else {
      return false;
    }
   // return this.loggedIn.getValue();
   // return this.loggedIn.asObservable();
  }

  get isScrumMaster(): boolean {
    if (localStorage.getItem('role') === 'ScrumMaster') {
      return true;
    } else {
      return false;
    }
  }

  get isProductOwner(): boolean {
    if (localStorage.getItem('role') === 'ProductOwner') {
      return true;
    } else {
      return false;
    }
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      this.loggedIn.next(true);                     // muss um weitere login logic erweitert werden
      localStorage.setItem('username', user.username);
      localStorage.setItem('role',  'ScrumMaster');
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('username');
    console.log(this.loggedIn.getValue());
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
