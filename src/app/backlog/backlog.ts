import {Task} from '../task/task';

export class Backlog {
  constructor(id: number, name: string, type: string, description: string, priority: number, progress: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.priority = priority;
    this.progress = progress;
  }
  id: number;
  name: string;
  type: string;
  description: string;
  priority: number;
  progress: number;
}
