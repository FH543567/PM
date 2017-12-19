import { Task } from '../task/task';

export class Story {
  id: number;
  name: string;
  description: string;
  priority: number;
  tasks: Task[];
}
