import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { FilterForm } from '../../components/filters/filters.component';
import { API } from '../../constants/api';
import { Response, ResponseObject } from '../../models/response';

export interface TaxonomyItem {
  id: number;
  title: string;
}

export interface Taxonomy {
  id: number;
  name: string;
  query_name: string;
  items: TaxonomyItem[];
}

export interface TaxonomyFilters {
  categories: TaxonomyItem[];
  tags: TaxonomyItem[];
}

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filterSubject = new Subject<FilterForm>();

  constructor(private httpClient: HttpClient) { }

  get taxonomies(): Response<TaxonomyFilters> {
    return this.httpClient.get<ResponseObject<Taxonomy[]>>(API.TAXONOMIES)
      .pipe(flatMap(res => of({...res, data: this.mapTaxonomyFilters(res.data)})));
  }

  mapTaxonomyFilters(taxonomies: Taxonomy[]): TaxonomyFilters {
    const categories = taxonomies.find(t => t.name === 'taxonomy_category');
    const tags = taxonomies.find(t => t.name === 'taxonomy_tag');
    const filters: TaxonomyFilters = {
      categories: categories ? categories.items : [],
      tags: tags ? tags.items : []
    };
    return filters;
  }
}
