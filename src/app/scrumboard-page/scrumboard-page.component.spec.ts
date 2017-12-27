import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumboardPageComponent } from './scrumboard-page.component';

describe('ScrumboardPageComponent', () => {
  let component: ScrumboardPageComponent;
  let fixture: ComponentFixture<ScrumboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrumboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrumboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
