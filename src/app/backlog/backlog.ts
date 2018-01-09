import {Task} from '../task/task';

export class Backlog {
  constructor(id: number, name: string, type: string, description: string, priority: number, estimatedTime: number, workedTime: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.priority = priority;
    this.estimatedTime = estimatedTime;
    this.workedTime = workedTime;
  }
  id: number;
  name: string;
  type: string;
  description: string;
  priority: number;
  estimatedTime: number;
  workedTime: number;
}
