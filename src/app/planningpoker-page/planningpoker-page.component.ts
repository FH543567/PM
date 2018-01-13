import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-planningpoker-page',
  templateUrl: './planningpoker-page.component.html',
  styleUrls: ['./planningpoker-page.component.css']
})

// TODO: nur der ScrumMaster kann runden anlegen.
// TODO: Beendet sind sie wenn alle die gleiche zeit eingegeben haben
export class PlanningpokerPageComponent implements OnInit {

  pokerLabel = 'exampleTask';
  pokerDescription = 'this is an Example Task with a lot of text and bla and you have to see whats ' +
    'going on and the bla bla bla is very important to blablablablabla';
  pokerData = [{ users: ['Hans', 'Peter', 'Ute'], hours: [3, 5, 6]},
    { users: ['Hans', 'Peter', 'Ute'], hours: [4, 5, 6]},
    { users: ['Hans', 'Peter', 'Ute'], hours: [4, 5, 5]},
    { users: ['Hans', 'Peter', 'Ute'], hours: [5, 5, 5]}
    ];

  constructor( private authService: AuthService) {}

  ngOnInit() {
  }

  // TODO: noch enbedingung prüfen
  isRoundEnd(): boolean {
    return true;
  }
}
