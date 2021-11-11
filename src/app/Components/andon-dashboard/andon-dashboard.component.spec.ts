import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndonDashboardComponent } from './andon-dashboard.component';

describe('AndonDashboardComponent', () => {
  let component: AndonDashboardComponent;
  let fixture: ComponentFixture<AndonDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndonDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
