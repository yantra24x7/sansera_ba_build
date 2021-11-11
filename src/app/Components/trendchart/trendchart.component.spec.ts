import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendchartComponent } from './trendchart.component';

describe('TrendchartComponent', () => {
  let component: TrendchartComponent;
  let fixture: ComponentFixture<TrendchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
