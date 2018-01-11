import { Backlog } from '../backlog/backlog';
import { Story } from '../story/story';

export class Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  workload: number;
  workedTime: number;
  storyId: number;
  sprintId: number;
  userId: number;

  constructor(id: number,
              name: string,
              description: string,
              priority: number,
              workload: number,
              workedTime: number,
              storyId?: number,
              sprintId?: number,
              userId?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.workload = workload;
    this.workedTime = workedTime;
    this.storyId = storyId;
    this.sprintId = sprintId;
    this.userId = userId;
  }
}
