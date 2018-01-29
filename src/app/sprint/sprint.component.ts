import { Component, OnInit } from '@angular/core';
import { Sprint } from './sprint';
import { Task } from '../task/task';
import { TaskService } from '../services/task.service';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HistoryEntry} from '../chart-page/historyEntry';


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

    //this.createHistoryEntries(new Sprint(4001, "vd", "test", 10, "2018-01-02", "2018-01-03"));
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
        .subscribe(result => {
          this.sprintService.getById(result[0].id).subscribe(sprint => {
            this.createHistoryEntries(sprint);
          });
          
          this.router.navigate(['../sprint']);
        });
    }
    this.formSubmitAttempt = true;
  }

  createHistoryEntries(sprint : Sprint) {

    console.log("createHistoryEntries()");
    // Erstellt leer History Entries für jeden Tag des Sprints
    let tempDate : Date = new Date(sprint.startDate);
    
    console.log("compare start:" + sprint.startDate + " end: " + sprint.endDate);
    console.log("compare start:" + new Date(sprint.startDate).toLocaleString() + " end: " + new Date(sprint.endDate).toLocaleString());
    while(tempDate <= new Date(sprint.endDate)) {


      console.log("temp: " + tempDate);
      const startDay = tempDate.getDate();
      const startMonth = tempDate.getMonth() + 1;
      const startYear = tempDate.getFullYear();
      const tempDateString = startYear + '-' + startMonth + '-' + startDay;


      this.sprintService.createHistory(new HistoryEntry(sprint.id, tempDateString, null)).subscribe();
      tempDate.setDate( tempDate.getDate() + 1 );
    }
  }

  isScrumMaster(): boolean {
    return this.authService.isScrumMaster;
  }
}
