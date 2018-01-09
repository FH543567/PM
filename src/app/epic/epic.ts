import { Story } from '../story/story';

export class Epic {
  constructor(id: number, name: string, description: string, priority: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
  }
  id: number;
  name: string;
  description: string;
  priority: number;
}
