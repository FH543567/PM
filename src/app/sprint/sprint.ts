import { Task } from '../task/task';

export class Sprint {
  constructor(id: number, name: string, description: string, availableTime: number, startDate: Date, endDate: Date, tasks: Task[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.availableTime = availableTime;
    this.startDate = startDate;
    this.endDate = endDate;
    this.tasks = tasks;
  }
  id: number;
  name: string;
  description: string;
  availableTime: number;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
}
