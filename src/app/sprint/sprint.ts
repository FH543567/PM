export class Sprint {
  id: number;
  name: string;
  description: string;
  availableTime: number;
  startDate: string;
  endDate: string;

  constructor(id: number, name: string, description: string, availableTime: number, startDate: string, endDate: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.availableTime = availableTime;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
