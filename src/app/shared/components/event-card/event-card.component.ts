import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import Event from '../../models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent {

  @Input() event: Event;
  @Output() eventSeeDetails = new EventEmitter<Event>();

  constructor() { }

  // Get the first full image Url from the images array
  get cardImage(): string {
    return this.event.images && this.event.images[0] && this.event.images[0].sizes.full.url;
  }
}
