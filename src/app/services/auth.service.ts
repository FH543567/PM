import {ChangeDetectorRef, Injectable} from '@angular/core';
import { User } from '../user/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {JsonConvert, JsonObject, JsonProperty} from 'json2typescript';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      this.loggedIn.next(true);                     // muss um weitere login logic erweitert werden
      localStorage.setItem('username', user.username);
      console.log(this.loggedIn.getValue());
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.loggedIn.next(false);
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