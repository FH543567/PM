import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpicService } from '../services/epic.service';
import { Epic } from '../epic/epic';

@Component({
  selector: 'app-epic-details',
  templateUrl: './epic-details.component.html',
  styleUrls: ['./epic-details.component.css']
})
export class EpicDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  epic: Epic;
  constructor(private route: ActivatedRoute, private epicService: EpicService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getEpic(this.id);
  }

  getEpic(id: number) {
    console.log('getEpic');
    console.log('ID: ' + id);
    this.epicService.getEpic(id)
      .subscribe( epic => this.epic = epic);
    console.log('Name: ' + this.epic.name);
  }

}
