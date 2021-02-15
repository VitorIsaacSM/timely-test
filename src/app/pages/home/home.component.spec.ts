import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterForm } from 'src/app/shared/components/filters/filters.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { Pagination } from 'src/app/shared/models/pagination';
import { EventList } from 'src/app/shared/services/events/events.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';

const EVENT_LIST_MOCK = (): Pagination<EventList> => ({
  from: undefined,
  has_next: undefined,
  has_prior: undefined,
  items: {
    '2021-02-15': [
      {
        end_datetime: new Date(),
        start_datetime: new Date(),
        title: 'Event 1',
        url: 'url'
      },
      {
        end_datetime: new Date(),
        start_datetime: new Date(),
        title: 'Event 2',
        url: 'url'
      }
    ],
    '2021-02-16': [],
  },
  size: undefined,
  total: undefined
});

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let spyGetEvents = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ SharedModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    spyGetEvents = spyOn(component, 'loadEvents');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the events on init', () => {
    expect(spyGetEvents).toHaveBeenCalled();
  });

  it('should display the loading while fetching', () => {
    component.isLoadingPage = true;
    fixture.detectChanges();
    const loading = fixture.debugElement.query(By.css('.loading-events'));
    expect(loading).toBeTruthy();
  });

  it('should display no results message', () => {
    component.isLoadingPage = false;
    component.pagination = {
      from: undefined,
      has_next: undefined,
      has_prior: undefined,
      items: {},
      size: undefined,
      total: undefined
    };
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('#no-event-results'));
    expect(message).toBeTruthy();
    expect(message.nativeElement.textContent).toContain('No results found');
  });

  it('should map the filter form into the fetch events query params', () => {
    const filter: FilterForm = {
      category: '999999',
      tag: undefined,
      pageSize: 10,
      startDate: undefined
    };
    const params = component.mapToFetchEventParams(filter);
    expect(params.categories).toEqual(filter.category);
    expect(params.per_page).toBe(filter.pageSize.toString());
    expect(params.tags).toBeFalsy();
    expect(params.start_date).toBeFalsy();
  });

  it('should display the event day sections', () => {
    component.isLoadingPage = false;
    component.pagination = EVENT_LIST_MOCK();
    fixture.detectChanges();
    const days = fixture.debugElement.queryAll(By.css('.event-day'));
    expect(days.length).toBe(2);
  });

  it('should display the events within a day', () => {
    component.isLoadingPage = false;
    component.pagination = EVENT_LIST_MOCK();
    fixture.detectChanges();
    const events = fixture.debugElement.queryAll(By.css('.event-day'));
    expect(events[0].queryAll(By.css('.event-card')).length).toBe(2);
    expect(events[1].queryAll(By.css('.event-card')).length).toBe(0);
  });
});
