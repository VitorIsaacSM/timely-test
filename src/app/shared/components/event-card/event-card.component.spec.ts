import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import Event from '../../models/event';
import { SharedModule } from '../../shared.module';
import { FiltersComponent } from '../filters/filters.component';

import { EventCardComponent } from './event-card.component';

const EVENT_MOCK = (): Event => ({
  end_datetime: new Date(),
  start_datetime: new Date(),
  title: 'event',
  url: '',
  description_short: 'description',
  images: [{
    id: 1,
    sizes: {
      full: {
        height: null,
        width: null,
        url: 'image-url-mock'
      }
    },
    title: ''
  }]
});

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ]
    })
    .overrideComponent(EventCardComponent, {
      set: new Component({
        selector: 'app-event-card',
        changeDetection: ChangeDetectionStrategy.Default
      })
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    component.event = EVENT_MOCK();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first full image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.src).toContain('image-url-mock');
  });

  it('should display the deafult image otherwise', () => {
    component.event.images[0].sizes.full.url = undefined;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.src).toContain('default-event-image.png');
  });
});
