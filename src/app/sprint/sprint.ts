export class Sprint {
  id: number;
  name: string;
  description: string;
  availableTime: number;
  startDate: Date;
  endDate: Date;

  constructor(id: number, name: string, description: string, availableTime: number, startDate: Date, endDate: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.availableTime = availableTime;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
