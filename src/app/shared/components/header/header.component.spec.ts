import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FiltersComponent } from '../filters/filters.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let toggleSpy = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, FiltersComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.filterOpen = false;
    toggleSpy = spyOn(component, 'toggleFilter').and.callThrough();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open the the filters from the header', () => {
    const p = fixture.debugElement.query(By.css('p.pointer')).nativeElement;
    p.click();
    fixture.detectChanges();
    expect(toggleSpy).toHaveBeenCalled();
    expect(component.filterOpen).toBeTruthy();
  });
  it('should toggle the filters after applying', () => {
    component.applyFilter(null);
    fixture.detectChanges();
    expect(toggleSpy).toHaveBeenCalled();
  });
});
