import { Injectable } from '@angular/core';
import { Story } from '../story/story';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DtoService } from './dto.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StoryService extends DtoService {
  
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/stories', http);
  }

  getAll(): Observable<Story[]> {
    return super.getAll()
      .map(storyList => storyList = storyList
        .map(storyDB => storyDB = new Story(storyDB.StoryID, storyDB.Name, storyDB.Description, storyDB.Priority, storyDB.EpicId)));
  }

  getById(id: number): Observable<Story> {
    return super.getById(id)
      .map(storyDB => storyDB = new Story(storyDB.StoryID, storyDB.Name, storyDB.Description, storyDB.Priority, storyDB.EpicId))
        //.catch(e => { console.log(e); return undefined; })
  }

  create(story): Observable<Story> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.StoryId = story.id;
    transferObject.Name = story.name;
    transferObject.Description = story.description;
    transferObject.Priority = story.priority;
    transferObject.EpicId = story.epicId;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  update(story): Observable<Story> {
    var transferObject: any = {};
    transferObject.StoryID = story.id;
    transferObject.Name = story.name;
    transferObject.Description = story.description;
    transferObject.Priority = story.priority;
    transferObject.EpicId = story.epicId;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  delete(id: number): Observable<number> {
    return super.delete(id);
  }

}
