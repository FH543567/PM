import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { ActivatedRoute } from '@angular/router';
import { Epic } from '../epic/epic';
import { EpicService } from '../services/epic.service';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  story: Story;
  epic: Epic;
  constructor(private route: ActivatedRoute, private storyService: StoryService, private epicService: EpicService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getStory(this.id);
    this.getEpic(this.story.epicId);
  }

  getStory(id: number) {
    this.storyService.getStory(id)
      .subscribe( story => this.story = story);
  }

  getEpic(id: number) {
    this.epicService.getEpic(id)
      .subscribe( epic => this.epic = epic);
  }

}
