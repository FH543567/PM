import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule,
  MatIconModule, MatMenuModule, MatGridListModule, MatInputModule, MatSelectModule , MatOptionModule} from '@angular/material';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoggedOutGuard } from './guards/logged-out.guard';

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
    HeaderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule,
      MatMenuModule, MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule]
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuard,
    LoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
