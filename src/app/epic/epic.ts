import { Story } from '../story/story';

export class Epic {
  id: number;
  name: string;
  description: string;
  priority: number;
  stories: Story[];
}
