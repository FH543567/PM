import {forEach} from '@angular/router/src/utils/collection';

export class Round {
  id: number;
  pokerId: number;
  users: string[];
  hours: number[];

  constructor(id?: number, users?: string[], hours?: number[], pokerId?: number) {
    this.id = id;
    this.pokerId = pokerId;
    this.users = users;
    this.hours = hours;
}}
