import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';



@NgModule({
  declarations: [CalendarEventComponent],
  imports: [
    CommonModule
  ],
  exports: [CalendarEventComponent]
})
export class SharedModule { }
