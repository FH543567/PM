import { Task } from '../task/task';

export class Story {
  constructor(id: number, name: string, description: string, priority: number, tasks: Task[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.tasks = tasks;
  }
  id: number;
  name: string;
  description: string;
  priority: number;
  tasks: Task[];
}
