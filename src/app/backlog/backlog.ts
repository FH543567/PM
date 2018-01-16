import {Task} from '../task/task';

export class Backlog {
  constructor(id: number, name: string, type: string, description: string, priority: number, estimation: number, workload: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.priority = priority;
    this.estimation = estimation;
    this.workload = workload;
  }
  id: number;
  name: string;
  type: string;
  description: string;
  priority: number;
  estimation: number;
  workload: number;
}
