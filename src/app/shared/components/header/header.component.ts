import { Component, OnInit } from '@angular/core';
import { FiltersService, TaxonomyFilters } from '../../services/filters/filters.service';
import { FilterForm } from '../filters/filters.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  filterOpen = false;
  filters: TaxonomyFilters;

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
    this.filtersService.taxonomies.subscribe(res => this.filters = res.data);
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  applyFilter(form: FilterForm) {
    this.filtersService.filterSubject.next(form);
    this.toggleFilter();
  }
}
