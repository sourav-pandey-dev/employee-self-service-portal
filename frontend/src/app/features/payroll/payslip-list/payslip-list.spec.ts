import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PayslipList } from './payslip-list';

describe('PayslipList', () => {
  let component: PayslipList;
  let fixture: ComponentFixture<PayslipList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayslipList],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayslipList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
