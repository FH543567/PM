export class HistoryEntry {
  sprintID: number;
  date: string;
  workRemaining: number;

  constructor(sprintID: number, date: string, workRemaining: number) {
    this.sprintID = sprintID;
    this.date = date;
    this.workRemaining = workRemaining;
  }
}
