import { Backlog } from '../backlog/backlog';

export class Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  estimatedTime: number;
  workedTime: number;

  constructor(id: number,
              name: string,
              description: string,
              priority: number,
              estimatedTime: number,
              workedTime: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.estimatedTime = estimatedTime;
    this.workedTime = workedTime;
  }

}
