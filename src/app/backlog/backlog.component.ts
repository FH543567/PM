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


  constructor(private fb: FormBuilder, private storyService: StoryService, private userService: UserService,
              private epicService: EpicService, private dataService: DataService, private taskService: TaskService) { }
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
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getStories() {
    this.storyService.getStories()
      .subscribe(stories => this.stories = stories);
  }

  getEpics() {
    this.epicService.getEpics()
      .subscribe( epics => this.epics = epics);
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

  createBacklog() {
    const backlog = new Backlog(this.id, this.name, this.type, this.description, this.priority, this.estimatedTime, 0);
    this.id = this.id + 1;
    this.backlogs.push(backlog);
    console.log('createBacklog');
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
      this.taskService.create(this.form.value);
    }
    if (this.form.valid && this.type === 'Story') {
      this.storyService.create(this.form.value);
    }
    if (this.form.valid && this.type === 'Epic') {
      this.epicService.create(this.form.value);
    }
    if (!this.form.valid) {
      console.log('Form not valid');
    }
    this.formSubmitAttempt = true;
  }
}
