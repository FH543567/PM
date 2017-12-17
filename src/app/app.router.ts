import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BacklogPageComponent } from './backlog-page/backlog-page.component';
import { SprintComponent } from './sprint/sprint.component';
import { SprintPageComponent } from './sprint-page/sprint-page.component';
import { ScrumboardPageComponent } from './scrumboard-page/scrumboard-page.component';
import { PlanningpokerPageComponent } from './planningpoker-page/planningpoker-page.component';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { RoadmapPageComponent } from './roadmap-page/roadmap-page.component';

export const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomePageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'backlog', component: BacklogPageComponent},
    { path: 'sprint', component: SprintPageComponent},
    { path: 'scrumboard', component: ScrumboardPageComponent},
    { path: 'planningpoker', component: PlanningpokerPageComponent},
    { path: 'chart', component: ChartPageComponent},
    { path: 'roadmap', component: RoadmapPageComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '/home' }
];