import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffReportComponent } from './eff-report.component';

describe('EffReportComponent', () => {
  let component: EffReportComponent;
  let fixture: ComponentFixture<EffReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
