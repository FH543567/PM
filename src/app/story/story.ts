export class Story {
  id: number;
  name: string;
  description: string;
  priority: number;
  epicId: number;

  constructor(id: number, name: string, description: string, priority: number, epicId?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.epicId = epicId;
  }
}
