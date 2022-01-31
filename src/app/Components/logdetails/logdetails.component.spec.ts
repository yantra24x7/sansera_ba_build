import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdetailsComponent } from './logdetails.component';

describe('LogdetailsComponent', () => {
  let component: LogdetailsComponent;
  let fixture: ComponentFixture<LogdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
