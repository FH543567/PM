import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TaskComponent } from './task/task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BacklogPageComponent } from './backlog-page/backlog-page.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintPageComponent } from './sprint-page/sprint-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    BacklogComponent,
    BacklogPageComponent,
    SprintComponent,
    SprintPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [MatButtonModule, MatCheckboxModule],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
