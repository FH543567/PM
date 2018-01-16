import { Component, OnInit } from '@angular/core';
import { Sprint } from './sprint';
import { Task } from '../task/task';
import { TaskService } from '../services/task.service';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    private fb: FormBuilder, private sprintService: SprintService, private taskService: TaskService) {}

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
    console.log('FormValue: ' + this.form.value);
    if (this.form.valid) {
      this.sprintService.create(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  createSprint() {
    const sprint = new Sprint(this.id, this.name, this.description, this.availableTime, new Date(2018, 2, 5), new Date(2018, 2, 10));
    this.id = this.id + 1;
    this.sprints.push(sprint);
    console.log('created Sprint');
  }

}
