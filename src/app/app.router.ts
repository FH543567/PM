import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BacklogPageComponent } from './backlog-page/backlog-page.component';
import { SprintPageComponent } from './sprint-page/sprint-page.component';
import { ScrumboardPageComponent } from './scrumboard-page/scrumboard-page.component';
import { PlanningpokerPageComponent } from './planningpoker-page/planningpoker-page.component';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { RoadmapPageComponent } from './roadmap-page/roadmap-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { BacklogComponent } from './backlog/backlog.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { EpicDetailsComponent } from './epic-details/epic-details.component';
import { Resolve } from '@angular/router';
import {Story} from './story/story';
// resolve: {storyTest: Story}
export const routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent, },
    { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]},
    { path: 'adduser', component: RegisterComponent, canActivate: [AuthGuard]},
    { path: 'backlog', component: BacklogPageComponent, canActivate: [AuthGuard]},
    { path: 'backlog/create', component: BacklogComponent, canActivate: [AuthGuard]},
    { path: 'tasks/details/:id', component: TaskDetailsComponent, canActivate: [AuthGuard]},
    { path: 'stories/details/:id', component: StoryDetailsComponent, canActivate: [AuthGuard]},
    { path: 'epics/details/:id', component: EpicDetailsComponent, canActivate: [AuthGuard]},
    { path: 'sprint', component: SprintPageComponent, canActivate: [AuthGuard]},
    { path: 'sprint/create', component: SprintComponent, canActivate: [AuthGuard]},
    { path: 'sprint/details', component: SprintDetailsComponent, canActivate: [AuthGuard]},
    { path: 'sprint/details/:id', component: SprintDetailsComponent, canActivate: [AuthGuard]},
    { path: 'scrumboard', component: ScrumboardPageComponent, canActivate: [AuthGuard]},
    { path: 'planningpoker', component: PlanningpokerPageComponent, canActivate: [AuthGuard]},
    { path: 'chart', component: ChartPageComponent, canActivate: [AuthGuard]},
    { path: 'roadmap', component: RoadmapPageComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '/home' }
];
