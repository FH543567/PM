import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlanningpokerComponent } from '../planningpoker/planningpoker.component';
import { Poker } from './poker';
import { Message } from './message';
import { Round } from './round';

@Component({
  selector: 'app-planningpoker-page',
  templateUrl: './planningpoker-page.component.html',
  styleUrls: ['./planningpoker-page.component.css']
})

// TODO: nur der ScrumMaster kann Planningpoker anlegen und runden beenden.
// TODO: Beendet ist das Planningpoker wenn alle die gleiche zeit eingegeben haben
export class PlanningpokerPageComponent implements OnInit {
  newPokerDialogRef: MatDialogRef<PlanningpokerComponent>;
  poker: Poker;
  newPoker: Poker;
  messages: Message[];
  newMessage: string;
  estimate: number;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.poker = this.dataService.getPoker();
    this.messages = this.dataService.getMessages();
  }

  // TODO: noch endbedingung prüfen
  get hasPokerEnded(): boolean {
      return false;
  }

  // TODO: Prüfen ob Daten in der Datenbank liegen
  get isPPokerRunning(): boolean {
    if (this.poker.label !== null && this.poker.description !== null) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: Programmieren was passiert wenn der "end Round" knopf gedückt wird
  endRound(): void {
    this.dataService.poker.roundData.push(new Round());
  }

  onEstimateSubmit() {
    this.dataService.enterEstimate(this.estimate);
    this.estimate = undefined;
  }

  onChatSubmit() {
    this.dataService.addMessage(this.newMessage);
    this.newMessage = '';
  }

  openNewPokerDialog() {
    this.newPoker = new Poker();
    this.newPokerDialogRef = this.dialog.open(PlanningpokerComponent, {
      hasBackdrop: true,
      width: '500',
      height: '500',
      data: {label: this.newPoker.label, description: this.newPoker.description}
    });

    this.newPokerDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (typeof result !== 'undefined') {
        if (typeof result.label !== 'undefined' && typeof result.description !== 'undefined') {
          this.poker = result;
          this.poker.roundData = new Array<Round>();
          this.poker.roundData.push(new Round(new Array<string>(), new Array<number>()));
          this.messages = new Array<Message>();
          this.dataService.poker = this.poker;
          this.dataService.chat = this.messages;
          // this.messages = [];
          // this.dataService.chat = [];
          console.log('new Planning-Poker Started!');
        }
      }
    });
  }
}
