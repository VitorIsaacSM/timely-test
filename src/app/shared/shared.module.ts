import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CalendarEventComponent } from './components/calendar-event/calendar-event.component';



@NgModule({
  declarations: [HeaderComponent, CalendarEventComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, CalendarEventComponent]
})
export class SharedModule { }
