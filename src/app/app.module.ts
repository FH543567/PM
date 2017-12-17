import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TaskComponent } from './task/task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomePageComponent,
    LoginComponent
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
