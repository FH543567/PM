import { Task } from '../task/task';
import { Story } from '../story/story';
import { Epic } from '../epic/epic';
import { Sprint } from '../sprint/sprint';
import { User } from '../user/user';

const epic1: Epic = new Epic(1, 'Epic 1', 'Beschreibung Epic 1', 1);
const epic2: Epic = new Epic(2, 'Epic 2', 'Beschreibung Epic 2', 2);
const epic3: Epic = new Epic(3, 'Epic 3', 'Beschreibung Epic 3', 1);
const epic4: Epic = new Epic(4, 'Epic 4', 'Beschreibung Epic 4', 3);

const story1: Story = new Story(1, 'Story 1', 'Beschreibung Story 1', 3, 1);
const story2: Story = new Story(2, 'Story 2', 'Beschreibung Story 2', 2, 3);
const story3: Story = new Story(3, 'Story 3', 'Beschreibung Story 3', 1, 4);
const story4: Story = new Story(4, 'Story 4', 'Beschreibung Story 4', 1, 2);

const task1: Task = new Task(1, 'Task 1', 'Beschreibung Task 1', 3, 10, 0, 1, 1);
const task2: Task = new Task(2, 'Task 2', 'Beschreibung Task 2', 2, 20, 2, 3, 1);
const task3: Task = new Task(3, 'Task 3', 'Beschreibung Task 3', 1, 5, 4, 2, 2);
const task4: Task = new Task(4, 'Task 4', 'Beschreibung Task 4', 3, 50, 1, 3, 1);
const task5: Task = new Task(5, 'Task 5', 'Beschreibung Task 5', 1, 40, 31, 4, 2);

const sprint1: Sprint = new Sprint(1, 'Sprint 1', 'Beschreibung Sprint 1', 5,
  new Date('2017-12-15'), new Date(2017, 12, 31));
const sprint2: Sprint = new Sprint(2, 'Sprint 2', 'Beschreibung Sprint 2', 5,
  new Date(2018, 1, 7), new Date(2018, 1, 14));

const user1: User = new User(1, 'MMU', 'secret', 'Max', 'Mustermann', 3);
const user2: User = new User(2, 'PEE', 'secret', 'Peter', 'Ernst', 2);

export const TASKS: Task[] = [task1, task2, task3, task4, task5];
export const STORIES: Story[] = [story1, story2, story3, story4];
export const EPICS: Epic[] = [epic1, epic2, epic3, epic4];
export const SPRINTS: Sprint[] = [sprint1, sprint2];
export const USERS: User[] = [user1, user2];
