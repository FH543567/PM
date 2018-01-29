import { Component, OnInit } from '@angular/core';
import { Sprint } from './sprint';
import { Task } from '../task/task';
import { TaskService } from '../services/task.service';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  private formSubmitAttempt: boolean;
  form: FormGroup;
  id = 3;
  name: string;
  description: string;
  availableTime: number;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  sprints: Sprint[];
  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private taskService: TaskService,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getSprints();
    this.getTasks();
    this.form = this.fb.group({
      name: ['', Validators.required],
      availableTime: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  getSprints() {
    this.sprintService.getAll()
      .subscribe(sprints => this.sprints = sprints);
  }

  getTasks() {
    this.taskService.getAll()
      .subscribe(tasks => this.tasks = tasks);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log('Valid: ' + this.form.valid);
    console.log('toLocaleDateString(): ' + this.form.value.startDate.toLocaleDateString());
    console.log('toDateString(): ' + this.form.value.startDate.toDateString());
    console.log('toISOString(): ' + this.form.value.startDate.toISOString());
    console.log('toUTCString(): ' + this.form.value.startDate.toUTCString());
    console.log('getUTCDate(): ' + this.form.value.startDate.getUTCDate());
    console.log('getDate(): ' + this.form.value.startDate.getDate());
    console.log('getMonth(): ' + this.form.value.startDate.getMonth());
    console.log('getVarDate: ' + this.form.value.startDate.getVarDate);
    console.log('getFullYear(): ' + this.form.value.startDate.getFullYear());
    console.log('toTimeString(): ' + this.form.value.startDate.toTimeString());
    console.log('getUTCMonth(): ' + this.form.value.startDate.getUTCMonth());

    if (this.form.valid) {
      const startDay = this.form.value.startDate.getDate();
      const startMonth = this.form.value.startDate.getMonth() + 1;
      const startYear = this.form.value.startDate.getFullYear();
      const startDate = startYear + '-' + startMonth + '-' + startDay;
      const endDay = this.form.value.endDate.getDate();
      const endMonth = this.form.value.endDate.getMonth() + 1;
      const endYear = this.form.value.endDate.getFullYear();
      const endDate = endYear + '-' + endMonth + '-' + endDay;
      console.log(new Date(startDay, startMonth, startYear));
      console.log(startDay + '-' + startMonth + '-' + startYear);
      const sprint: Sprint = new Sprint(
        null,
        this.form.value.name,
        this.form.value.description,
        this.form.value.availableTime,
        startDate,
        endDate
      );
      this.sprintService.create(sprint)
        .subscribe(() => this.router.navigate(['../sprint']));
    }
    this.formSubmitAttempt = true;
  }

  isScrumMaster(): boolean {
    return this.authService.isScrumMaster;
  }
}
