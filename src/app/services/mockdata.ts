import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Sprint } from '../sprint/sprint';

export const TASK: Task[] = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Beschreibung task1',
    priority: 3,
    estimatedTime: 10,
    workedTime: 0
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Beschreibung task2',
    priority: 2,
    estimatedTime: 20,
    workedTime: 2
  }
];
export const STORY: Story[] = [
  {
    id: 1,
    name: 'Story 1',
    description: 'Beschreibung Story 1',
    priority: 1,
    tasks: TASK
  }
];

export const EPIC: Epic[] = [
  {
    id: 1,
    name: 'Epic 1',
    description: 'Beschreibung Epic 1',
    priority: 1,
    stories: STORY
  }
];

export const SPRINT: Sprint[] = [
  {
    id: 1,
    name: "Sprint 1",
    description: "Beschreibung Sprint 1",
    availableTime: 5,
    startDate: new Date(),
    endDate: new Date(),
    tasks: TASK
  }
];