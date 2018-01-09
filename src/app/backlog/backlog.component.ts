import { Component, OnInit } from '@angular/core';
import {Backlog} from './backlog';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  id = 6;
  name: string;
  type: string;
  priority: number;
  description: string;
  estimatedTime: number;
  workedTime: number;
  backlogs: Backlog[] = [];
  constructor() { }

  ngOnInit() {
  }

  setType(type: string) {
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

}
