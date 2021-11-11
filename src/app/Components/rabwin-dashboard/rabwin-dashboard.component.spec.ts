import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RabwinDashboardComponent } from './rabwin-dashboard.component';

describe('RabwinDashboardComponent', () => {
  let component: RabwinDashboardComponent;
  let fixture: ComponentFixture<RabwinDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RabwinDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RabwinDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
