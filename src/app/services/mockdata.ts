import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Sprint } from '../sprint/sprint';

const task1: Task = new Task(1, 'Task 1', 'Beschreibung Task 1', 3, 10, 0);
const task2: Task = new Task(2, 'Task 2', 'Beschreibung Task 2', 2, 20, 2);
const task3: Task = new Task(3, 'Task 3', 'Beschreibung Task 3', 1, 5, 4);
const task4: Task = new Task(4, 'Task 4', 'Beschreibung Task 4', 3, 50, 1);
const task5: Task = new Task(5, 'Task 5', 'Beschreibung Task 5', 1, 40, 31);

const story1: Story = new Story(1, 'Story 1', 'Beschreibung Story 1', 1, [task1, task3]);
const story2: Story = new Story(2, 'Story 2', 'Beschreibung Story 2', 2, [task2, task4, task5]);

const epic1: Epic = new Epic(1, 'Epic 1', 'Beschreibung Epic 1', 1, [story1, story2]);

const sprint1: Sprint = new Sprint(1, 'Sprint 1', 'Beschreibung Sprint 1', 5, new Date('2017-12-15'), new Date(2017, 12, 31), [task1, task2]);
const sprint2: Sprint = new Sprint(2, 'Sprint 2', 'Beschreibung Sprint 2', 5, new Date(2018, 1, 7), new Date(2018, 1, 14), [task3, task5]);

export const TASKS: Task[] = [task1, task2, task3, task4, task5];
export const STORIES: Story[] = [story1, story2];
export const EPICS: Epic[] = [epic1];
export const SPRINTS: Sprint[] = [sprint1, sprint2];
