import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Story } from '../story/story';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {
  private sub: any;
  story: Story;
  constructor(private route: ActivatedRoute, private storyService: StoryService) { }

  ngOnInit() {
    let id: number;
    this.sub = this.route.params.subscribe(params => {
      id = +params['id']; // (+) converts string 'id' to a number
    });
    this.getStory(id);
  }

  getStory(id: number) {
    this.storyService.getStory(id)
      .subscribe( story => this.story = story);
  }

}
