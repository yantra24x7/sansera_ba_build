import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIdleComponent } from './report-idle.component';

describe('ReportIdleComponent', () => {
  let component: ReportIdleComponent;
  let fixture: ComponentFixture<ReportIdleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIdleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
