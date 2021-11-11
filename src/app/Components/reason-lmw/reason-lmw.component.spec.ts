import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonLmwComponent } from './reason-lmw.component';

describe('ReasonLmwComponent', () => {
  let component: ReasonLmwComponent;
  let fixture: ComponentFixture<ReasonLmwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonLmwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonLmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
