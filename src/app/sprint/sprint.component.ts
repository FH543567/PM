import { Component, OnInit } from '@angular/core';
import {Sprint} from './sprint';
import { Task } from '../task/task';
import {Backlog} from '../backlog/backlog';


@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  id = 3;
  name: string;
  description: string;
  availableTime: number;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
  sprints: Sprint[];

  ngOnInit() {
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
