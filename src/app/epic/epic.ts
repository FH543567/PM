import { Story } from '../story/story';

export class Epic {
  constructor(id: number, name: string, description: string, priority: number, stories: Story[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.stories = stories;
  }
  id: number;
  name: string;
  description: string;
  priority: number;
  stories: Story[];
}
