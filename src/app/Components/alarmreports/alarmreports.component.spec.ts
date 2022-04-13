import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmreportsComponent } from './alarmreports.component';

describe('AlarmreportsComponent', () => {
  let component: AlarmreportsComponent;
  let fixture: ComponentFixture<AlarmreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
