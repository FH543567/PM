import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { PokerService } from '../services/poker.service';
import { RoundService } from '../services/round.service';
import { MessageService } from '../services/message.service';
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

export class PlanningpokerPageComponent implements OnInit {
  newPokerDialogRef: MatDialogRef<PlanningpokerComponent>;
  isPPokerRunning = false;
  isPPokerNotOver = false;
  poker: Poker;
  newPoker: Poker;
  messages: Message[];
  newMessage: string;
  estimate: number;

  usersTest: string[];
  hoursTest: number[];

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private pokerService: PokerService,
    private roundService: RoundService,
    private messageService: MessageService,
    private dialog: MatDialog) { }

  ngOnInit() {
  this.getData();
  }

  /**
   * beendet eine Pokerrunde
   */
  endRound(): void {
    console.log(this.poker.roundData[this.poker.roundData.length - 1]);
    // this.roundService.create(this.poker.roundData[this.poker.roundData.length - 1]).subscribe();
    // const tempobj = new Round(0, 1, new Array<string>(), new Array<number>());
        // wenn noch keine eingabe gemacht wird soll keine neue runde starten
    if (this.poker.roundData[this.poker.roundData.length - 1].users !== undefined) {
      if (this.poker.roundData[this.poker.roundData.length - 1].users.length >= 1) {
        this.poker.roundData.push(new Round(0, 1, new Array<string>(), new Array<number>()));
        this.roundService.create(new Round(0, 1, new Array<string>(), new Array<number>())).subscribe();
        this.setIsPPokerOver();
      }
    }
  }

  /**
   * gibt ein Estimate ab
   */
  onEstimateSubmit() {
    if ( this.estimate !== undefined && !this.isPPokerNotOver ) {
      // Erste Eingabe einer runde:
      if (this.poker.roundData[this.poker.roundData.length - 1].users === undefined) {
        this.poker.roundData[this.poker.roundData.length - 1].users.push(localStorage.getItem('username'));
        this.poker.roundData[this.poker.roundData.length - 1].hours.push(this.estimate);
        this.roundService.update(this.poker.roundData[this.poker.roundData.length - 1]).subscribe();
      }else {
        // Wenn schon eine eingabe diese runde gemacht wurde keine akzeptieren
        let temp = false;
        for ( const username of this.poker.roundData[this.poker.roundData.length - 1].users) {
          if (username === localStorage.getItem('username')) {
            temp = true;
          }
        }
        if (!temp) {
          this.poker.roundData[this.poker.roundData.length - 1].users.push(localStorage.getItem('username'));
          this.poker.roundData[this.poker.roundData.length - 1].hours.push(this.estimate);
          this.roundService.update(this.poker.roundData[this.poker.roundData.length - 1]).subscribe();
        }
      }
    }
    this.estimate = undefined;
  }

  /**
   * sendet eine Chatnachricht
   */
  onChatSubmit() {
    if (this.newMessage !== '' && typeof this.newMessage !== 'undefined') {
      const tempMsg = new Message();
      tempMsg.user = localStorage.getItem('username');
      tempMsg.text = this.newMessage;
      this.messageService.create(tempMsg).subscribe();
      this.messages.push(tempMsg);
      this.newMessage = '';
    }
  }

  /**
   * Startet ein neues Planningpoker
   */
  openNewPokerDialog() {
    this.newPoker = new Poker();
    this.newPokerDialogRef = this.dialog.open(PlanningpokerComponent, {
      hasBackdrop: true,
      width: '500',
      height: '500',
      data: { label: this.newPoker.label, description: this.newPoker.description }
    });

    this.newPokerDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (typeof result !== 'undefined') {
        if (typeof result.label !== 'undefined' && typeof result.description !== 'undefined') {
         console.log(this.poker);
          this.poker = result;
          this.poker.id = 1;
          this.poker.roundData = new Array<Round>();
          this.poker.roundData.push(new Round(0, 1, new Array<string>(), new Array<number>()));
          this.messages = new Array<Message>();
          // this.dataService.poker = this.poker;
          // this.dataService.chat = this.messages

          console.log(this.poker);
          this.pokerService.update(this.poker).subscribe();
          this.roundService.create(new Round(0, 1, new Array<string>(), new Array<number>())).subscribe();
          this.messageService.delete(0).subscribe();
          this.isPPokerRunning = true;
          this.isPPokerNotOver = false;
          console.log('new Planning-Poker Started!');
        }
      }
    });
  }

  setIsPPokerOver() {
    // Set isPPokerOver
    if (this.poker.roundData.length >= 2) {
      // prüfen ob sich eine von einer anderen zahl unterscheidet
      const est = this.poker.roundData[this.poker.roundData.length - 2].hours[0];
      for ( const estimate of this.poker.roundData[this.poker.roundData.length - 2].hours) {
        // console.log('Round ' + (this.poker.roundData.length - 1) + ' ' + estimate + ' !== ' + est);
        if (estimate !== est) {
          this.isPPokerNotOver = false;
        }else {
          this.isPPokerNotOver = true;
        }
      }
    }
  }

  getData() {
  this.roundService.getAll().subscribe(res => {
    this.pokerService.getAll().subscribe(pokers => {
      this.poker = pokers ? pokers[0] : undefined;
      // Prämisse: alle rounds gehören zum ersten Poker
      console.log( res);
      if (res.length === 0) {
        res.push(new Round(0, 1, new Array<string>(), new Array<number>()));
      }
      this.poker.roundData = res;
      console.log(JSON.stringify(this.poker));

      // Set isPPokerRunning
      if (pokers) {
        this.isPPokerRunning = true;
      }

      // Set isPPokerOver
      if (res.length >= 2) {
        // prüfen ob sich eine von einer anderen zahl unterscheidet
        const est = res[res.length - 2].hours[0];
        for ( const estimate of res[res.length - 2].hours) {
          // console.log('Round ' + (this.poker.roundData.length - 1) + ' ' + estimate + ' !== ' + est);
          if (estimate !== est) {
            this.isPPokerNotOver = false;

          }else {
            this.isPPokerNotOver = true;
          }
        }
      }
    });
  });
  // Achtung: es wird nur der erst Poker in der DB verwendet
  this.messageService.getAll().subscribe(messages => this.messages = messages);
  }
}
