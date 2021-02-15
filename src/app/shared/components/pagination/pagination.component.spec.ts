import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let spy = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.currentPage = 2;
    component.totalPages = 10;
    spy = spyOn(component, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the next page number', () => {
    const btn = fixture.debugElement.query(By.css('.fa-angle-right'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(3);
  });

  it('should emit the prev page number', () => {
    const btn = fixture.debugElement.query(By.css('.fa-angle-left'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not emit the prev page number', () => {
    component.currentPage = 1;
    const btn = fixture.debugElement.query(By.css('.fa-angle-left'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit the last page number', () => {
    const btn = fixture.debugElement.query(By.css('.fa-angle-double-right'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should emit the first page number', () => {
    const btn = fixture.debugElement.query(By.css('.fa-angle-double-left'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
