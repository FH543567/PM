import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BacklogPageComponent } from './backlog-page/backlog-page.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintPageComponent } from './sprint-page/sprint-page.component';
import { ScrumboardPageComponent } from './scrumboard-page/scrumboard-page.component';
import { PlanningpokerPageComponent } from './planningpoker-page/planningpoker-page.component';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { RoadmapPageComponent } from './roadmap-page/roadmap-page.component';
import { routes } from './app.router';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
import { TaskComponent } from './task/task.component';
import { StoryComponent } from './story/story.component';
import { EpicComponent } from './epic/epic.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    BacklogComponent,
    BacklogPageComponent,
    SprintComponent,
    SprintPageComponent,
    ScrumboardPageComponent,
    PlanningpokerPageComponent,
    ChartPageComponent,
    RoadmapPageComponent,
    TaskComponent,
    StoryComponent,
    EpicComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule]
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
