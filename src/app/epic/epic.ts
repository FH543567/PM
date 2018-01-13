export class Epic {
  id: number;
  name: string;
  description: string;
  priority: number;

  constructor(id: number, name: string, description: string, priority: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
  }
}
