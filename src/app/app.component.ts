import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User} from './user/user';
import { JsonConvert } from 'json2typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Willkommen!';
  private username: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currUser') != null) {
      this.username = new JsonConvert().deserializeObject(JSON.parse(localStorage.getItem('currUser')), User).username;
    }
  }

  logout() {
    localStorage.removeItem('currUser');
    this.router.navigate(['']);
  }
}
