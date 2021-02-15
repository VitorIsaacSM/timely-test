import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API } from '../../constants/api';
import { ResponseObject } from '../../models/response';
import { FiltersService, Taxonomy, TaxonomyFilters } from './filters.service';

const FILTERED_TAXONOMIES_MOCK: TaxonomyFilters = {
  categories: [{ id: 1, title: 'item1' }],
  tags: []
};

const RAW_TAXONOMIES_MOCK: ResponseObject<Taxonomy[]> = {
  code: 200,
  data: [
    {
      id: 1,
      items: [{ id: 1, title: 'item1' }],
      name: 'taxonomy_category',
      query_name: 'taxonomy_category'
    }
  ],
  message: '',
  success: true
};

describe('FiltersService', () => {
  let service: FiltersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(FiltersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a filtered list of taxonomies', () => {
    service.taxonomies.subscribe(res => {
      expect(res.data).toEqual(FILTERED_TAXONOMIES_MOCK);
    });

    const req = httpMock.expectOne(API.TAXONOMIES);
    expect(req.request.method).toBe('GET');
    req.flush(RAW_TAXONOMIES_MOCK);
  });
});
