import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdashComponent } from './newdash.component';

describe('NewdashComponent', () => {
  let component: NewdashComponent;
  let fixture: ComponentFixture<NewdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
