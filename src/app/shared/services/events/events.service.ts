import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants/api';
import { Response, ResponseObject } from '../../models/response';
import Event from '../../models/event';
import { Pagination } from '../../models/pagination';

export interface EventList {
  [p: string]: Event[];
}

export interface GetEventsParams {
  group_by_date?: string;
  start_date?: string;
  per_page?: string;
  page?: string;
  categories?: string;
  tags?: string;
}

const defaultParams: GetEventsParams = {
  group_by_date: '1',
  start_date: new Date().toISOString(),
  per_page: '8',
  page: '1'
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(params?: GetEventsParams): Response<Pagination<EventList>> {
    return this.http.get<ResponseObject<Pagination<EventList>>>(`${API.EVENTS}`, { params: {
      ...defaultParams,
      ...params
    }});
  }
}
