import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.username = localStorage.getItem('username');
  }

  get isLoggedIn(){
    if (localStorage.getItem('username') != null) {
      this.username = localStorage.getItem('username');
      return true;
    }
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }
}
