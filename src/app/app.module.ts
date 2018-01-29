import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
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
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { TaskComponent } from './task/task.component';
import { StoryComponent } from './story/story.component';
import { EpicComponent } from './epic/epic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { DragulaModule } from 'ng2-dragula';
import { SprintService } from './services/sprint.service';
import { TaskService } from './services/task.service';
import { StoryService } from './services/story.service';
import { EpicService } from './services/epic.service';
import { UserService } from './services/user.service';
import { PokerService } from './services/poker.service';
import { RoundService } from './services/round.service';
import { MessageService } from './services/message.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { EpicDetailsComponent } from './epic-details/epic-details.component';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule,
  MatIconModule, MatMenuModule, MatGridListModule, MatInputModule, MatSelectModule ,
  MatOptionModule, MatTableModule, MatFormFieldModule, MatSidenavModule, MatListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatStepperModule,
  MatChipsModule, MatButtonToggleModule, MatDialogModule, MatSortModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PlanningpokerComponent } from './planningpoker/planningpoker.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

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
    SprintDetailsComponent,
    PlanningpokerComponent,
    TaskDetailsComponent,
    StoryDetailsComponent,
    EpicDetailsComponent,
    DeleteConfirmComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragulaModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ChartsModule,
    ScrollDispatchModule,
    [MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule,
      MatMenuModule, MatGridListModule, MatInputModule, MatSelectModule, MatOptionModule,
      MatTableModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule,
      MatSidenavModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule,
      MatStepperModule, MatChipsModule, MatButtonToggleModule, MatDialogModule, MatSortModule]
  ],
  providers: [
    UserService,
    SprintService,
    StoryService,
    EpicService,
    TaskService,
    DataService,
    AuthService,
    PokerService,
    MessageService,
    RoundService,
    AuthGuard,
    LoggedOutGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [PlanningpokerComponent, DeleteConfirmComponent]
})
export class AppModule { }
