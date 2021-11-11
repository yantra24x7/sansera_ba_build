import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparechartComponent } from './comparechart.component';

describe('ComparechartComponent', () => {
  let component: ComparechartComponent;
  let fixture: ComponentFixture<ComparechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
