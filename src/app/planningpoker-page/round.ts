import {forEach} from '@angular/router/src/utils/collection';

export class Round {
  pokerId: number;
  users: string[];
  hours: number[];

  constructor(users?: string[], hours?: number[]) {
    this.users = users;
    this.hours = hours;
}}
