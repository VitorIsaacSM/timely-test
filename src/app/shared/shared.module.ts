import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './components/event-card/event-card.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [EventCardComponent, HeaderComponent, PaginationComponent, LoadingComponent],
  imports: [
    CommonModule
  ],
  exports: [EventCardComponent, HeaderComponent, PaginationComponent, LoadingComponent]
})
export class SharedModule { }
