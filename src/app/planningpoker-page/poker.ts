import { Round } from './round';
export class Poker {

  id: number;
  label: string;
  description: string;
  roundData: Round[];

  constructor(id?: number, label?: string, description?: string, roundData?: Round[]) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.roundData = roundData;
  }
}
