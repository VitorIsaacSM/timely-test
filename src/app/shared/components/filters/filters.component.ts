import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaxonomyFilters } from '../../services/filters/filters.service';

export interface FilterForm {
  category: string;
  tag: string;
  startDate: string;
  pageSize: number;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  @Input() open: boolean;
  @Input() filters: TaxonomyFilters;
  @Output() eventClose = new EventEmitter();
  @Output() eventApply = new EventEmitter<FilterForm>();

  form = this.fb.group({
    category: [''],
    tag: [''],
    startDate: [''],
    pageSize: [10]
  });

  constructor(private fb: FormBuilder) { }

  apply() {
    this.eventApply.emit({...this.formValues});
  }

  get formValues(): FilterForm {
    return this.form.value as FilterForm;
  }
}
