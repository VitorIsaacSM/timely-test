import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .overrideComponent(FiltersComponent, {
      set: new Component({
        selector: 'app-filters',
        changeDetection: ChangeDetectionStrategy.Default
      })
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    component.open = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the filters', () => {
    component.open = false;
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.filters-container'));
    expect(container).toBeFalsy();
  });

  it('should show the filters', () => {
    const container = fixture.debugElement.query(By.css('.filters-container'));
    expect(container).toBeTruthy();
  });

  it('should emit the value of the form', () => {
    const spy = spyOn(component.eventApply, 'emit');
    component.form.controls.pageSize.patchValue(20);
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.first().args[0].pageSize).toEqual(20);
  });
  it('should emit the toggle event', () => {
    const spy = spyOn(component.eventClose, 'emit');
    const hideBtn = fixture.debugElement.query(By.css('.fa-times'));
    hideBtn.nativeElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
