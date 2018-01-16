import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningpokerComponent } from './planningpoker.component';

describe('PlanningpokerComponent', () => {
  let component: PlanningpokerComponent;
  let fixture: ComponentFixture<PlanningpokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningpokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningpokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
