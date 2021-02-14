import { Component, OnInit } from '@angular/core';
import { EventList, EventsService } from 'src/app/shared/services/events/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: EventList = {};

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(res => {
      this.events = res.data.items;
    });
  }

  get eventDates(): string[] {
    return Object.keys(this.events);
  }

}
