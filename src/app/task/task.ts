import { Backlog } from '../backlog/backlog';
import { Story } from '../story/story';

export class Task {
  id: number;
  name: string;
  description: string;
  priority: number;
  estimatedTime: number;
  workedTime: number;
  assignedStory: Story;
  constructor(id: number,
              name: string,
              description: string,
              priority: number,
              estimatedTime: number,
              workedTime: number,
              assignedStory: Story,
              ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.estimatedTime = estimatedTime;
    this.workedTime = workedTime;
    this.assignedStory = assignedStory;
  }
}
