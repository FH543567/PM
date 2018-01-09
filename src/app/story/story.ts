import { Epic } from '../epic/epic';

export class Story {
  id: number;
  name: string;
  description: string;
  priority: number;
  assignedEpic: Epic;
  constructor(id: number, name: string, description: string, priority: number, assignedEpic: Epic) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.assignedEpic = assignedEpic;
  }
}
