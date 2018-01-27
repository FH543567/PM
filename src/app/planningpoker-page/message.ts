export class Message {
  id: number;
  user: string;
  text: string;

  constructor(id?: number, user?: string, text?: string) {
    this.id = id;
    this.user = user;
    this.text = text;
  }
}
