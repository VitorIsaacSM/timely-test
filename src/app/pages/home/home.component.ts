import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/shared/models/pagination';
import { EventList, EventsService, GetEventsParams } from 'src/app/shared/services/events/events.service';
import { finalize } from 'rxjs/operators';
import { FiltersService } from 'src/app/shared/services/filters/filters.service';
import { FilterForm } from 'src/app/shared/components/filters/filters.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pagination: Pagination<EventList>;
  filterParams: GetEventsParams;
  isLoadingPage = true;

  constructor(private eventsService: EventsService, private filtersService: FiltersService) { }

  ngOnInit() {
    this.loadEvents();
    this.filtersService.filterSubject.subscribe(filterValues => {
      this.filterParams = this.mapToFetchEventParams(filterValues);
      this.loadEvents();
    });
  }

  mapToFetchEventParams(filterValues: FilterForm): GetEventsParams {
    const params: GetEventsParams = {
      per_page: `${filterValues.pageSize || this.pagination.size}`,
      page: '1'
    };
    if (filterValues.category) { params.categories = filterValues.category; }
    if (filterValues.tag) { params.tags = filterValues.tag; }
    if (filterValues.startDate) { params.start_date = filterValues.startDate; }
    return params;
  }

  loadEvents(params: GetEventsParams = {}) {
    this.isLoadingPage = true;
    this.eventsService.getEvents({...this.filterParams, ...params})
      .pipe(finalize(() => this.isLoadingPage = false))
      .subscribe(res => this.pagination = res.data);
  }

  // Returns the events from the pagination object, or an empty object as default if still loading pagination
  get events(): EventList {
    return this.pagination ? this.pagination.items : {};
  }

  // Returns an array with the Date strings, that are the key to lists of events from that day in the events object
  get eventDates(): string[] {
    return Object.keys(this.events);
  }

  get currentPage(): number {
    return (this.pagination.from / this.pagination.size) + 1;
  }
  get totalPages(): number {
    return Math.ceil(this.pagination.total / this.pagination.size);
  }
}
