import { Task } from '../task/task';

export class Sprint {
  id: number;
  name: string;
  description: string;
  availableTime: number;
  startDate: Date;
  endDate: Date;
  tasks: Task[];
}
