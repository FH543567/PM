import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningpokerPageComponent } from './planningpoker-page.component';

describe('PlanningpokerPageComponent', () => {
  let component: PlanningpokerPageComponent;
  let fixture: ComponentFixture<PlanningpokerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningpokerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningpokerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
