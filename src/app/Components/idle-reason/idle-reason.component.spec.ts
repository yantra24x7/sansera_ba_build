import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleReasonComponent } from './idle-reason.component';

describe('IdleReasonComponent', () => {
  let component: IdleReasonComponent;
  let fixture: ComponentFixture<IdleReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdleReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
