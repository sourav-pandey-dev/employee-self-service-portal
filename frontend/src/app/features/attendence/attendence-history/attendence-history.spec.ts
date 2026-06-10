import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceHistory } from './attendence-history';

describe('AttendenceHistory', () => {
  let component: AttendenceHistory;
  let fixture: ComponentFixture<AttendenceHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendenceHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
