import { Injectable } from '@angular/core';
import { Epic } from '../epic/epic';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { DtoService } from './dto.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EpicService extends DtoService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/epics', http);
  }

  getAll(): Observable<Epic[]> {
    return super.getAll()
      .map(epicList => epicList = epicList
        .map(epicDB => epicDB = new Epic(epicDB.EpicID, epicDB.Name, epicDB.Description, epicDB.Priority)));
  }

  getById(id: number): Observable<Epic> {
    return super.getById(id)
      .map(epicDB => epicDB = new Epic(epicDB.EpicID, epicDB.Name, epicDB.Description, epicDB.Priority))
        //.catch(e => { console.log(e); return undefined; })
  }

  create(epic): Observable<Epic> {
    var transferObject: any = {};
    //ID wird nicht berücksichtigt, da auto-increment
    //transferObject.EpicId = epic.id;
    transferObject.Name = epic.name;
    transferObject.Description = epic.description;
    transferObject.Priority = epic.priority;
    console.log(JSON.stringify(transferObject));
    return super.create(JSON.stringify(transferObject));;
  }

  update(epic): Observable<Epic> {
    var transferObject: any = {};
    transferObject.EpicID = epic.id;
    transferObject.Name = epic.name;
    transferObject.Description = epic.description;
    transferObject.Priority = epic.priority;
    console.log(JSON.stringify(transferObject));
    return super.update(JSON.stringify(transferObject));;
  }

  delete(id: number): Observable<number> {
    return super.delete(id);
  }


}
