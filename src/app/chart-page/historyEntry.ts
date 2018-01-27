export class HistoryEntry {
  sprintID: number;
  date: Date;
  workRemaining: number;

  constructor(sprintID: number, date: Date, workRemaining: number) {
    this.sprintID = sprintID;
    this.date = date;
    this.workRemaining = workRemaining;
  }
}
