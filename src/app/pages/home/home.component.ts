import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(res => {
      console.log(res.data.items)
    })
  }

}
