import { Component, OnInit } from '@angular/core';
import { Backlog } from './backlog';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { User } from '../user/user';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EpicService } from '../services/epic.service';
import { Epic } from '../epic/epic';
import { DataService } from '../services/data.service';
import { TaskService } from '../services/task.service';
import {Task} from '../task/task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  private formSubmitAttempt: boolean;
  form: FormGroup;
  formTask: FormGroup;
  id = 6;
  name: string;
  type: string;
  priority: number;
  description: string;
  estimatedTime: number;
  workedTime: number;
  backlogs: Backlog[] = [];
  stories: Story[];
  users: User[];
  epics: Epic[];
  task: boolean;
  story: boolean;
  epic: boolean;

  constructor(private fb: FormBuilder,
              private storyService: StoryService,
              private userService: UserService,
              private epicService: EpicService,
              private dataService: DataService,
              private taskService: TaskService,
              public router: Router
  ) {}
  ngOnInit() {
    this.getStories();
    this.getUsers();
    this.getEpics();
    this.form = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.minLength(2)],
      description: ['', ],
      priority: ['', Validators.required],
      userId: ['', ],
      storyId: ['', ],
      epicId: ['', ],
      workload: ['', ]
    });
    this.formTask = this.fb.group({
      // name: ['', Validators.required],
      workload: ['', Validators.required]// ,
      // description: ['', Validators.required],
      // priority: ['', Validators.required],
      // type: ['', Validators.required],
      // userId: ['', Validators.required]
    });
  }

  getUsers() {
    this.userService.getAll()
      .subscribe(users => this.users = users,
        error => console.log('Error: ', error)
      );
  }

  getStories() {
    this.storyService.getAll()
      .subscribe(stories => this.stories = stories,
        error => console.log('Error: ', error)
      );
  }

  getEpics() {
    this.epicService.getAll()
      .subscribe( epics => this.epics = epics,
        error => console.log('Error: ', error)
      );
  }

  setType(type: string) {
    if (type ===  'task') {
      this.task = true;
      this.story = false;
      this.epic = false;
    }
    if (type === 'story') {
      this.task = false;
      this.story = true;
      this.epic = false;
    }
    if (type === 'epic') {
      this.task = false;
      this.story = false;
      this.epic = true;
    }
    this.type = type;
    console.log('Type: ' + type);
  }

  setPriority(priority: number) {
    this.priority = priority;
    console.log('Priority: ' + priority);
  }

  setName(name: string) {
    this.name = name;
    console.log('Name: ' + name);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    console.log('onSubmit');
    console.log('Type: ' + this.type);
    console.log('Valid: ' + this.form.valid);
    if (this.form.valid && this.type === 'Task') {
      const task: Task = new Task(
        null,
        this.form.value.name,
        this.form.value.description,
        this.priority,
        this.form.value.workload,
        0,
        this.form.value.storyId.id,
        null,
        this.form.value.userId.id,
      );
      this.taskService.create(task)
        .subscribe(() => this.router.navigate(['../backlog']));
    }
    if (this.form.valid && this.type === 'Story') {
      const story: Story = new Story(
        null,
        this.form.value.name,
        this.form.value.description,
        this.form.value.priority,
        this.form.value.epicId.id
      );
      this.storyService.create(story)
        .subscribe(() => this.router.navigate(['../backlog']));
    }
    if (this.form.valid && this.type === 'Epic') {
      const epic: Epic = new Epic(
        null,
        this.form.value.name,
        this.form.value.description,
        this.form.value.priority
      );
      this.epicService.create(epic)
        .subscribe(() => this.router.navigate(['../backlog']));
    }
    if (!this.form.valid) {
      console.log('Form not valid');
    }
    this.formSubmitAttempt = true;
  }
}
