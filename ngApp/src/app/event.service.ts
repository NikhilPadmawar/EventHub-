import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl="http://localhost:3000/api/events";
  private _specialEventsUrl="http://localhost:3000/api/special"
  constructor(private httpClient:HttpClient) { }

  getEvents(){
    return this.httpClient.get<any>(this._eventsUrl)
  } 

  getSpecialEvents(){
    return this.httpClient.get<any>(this._specialEventsUrl)
  }
}
