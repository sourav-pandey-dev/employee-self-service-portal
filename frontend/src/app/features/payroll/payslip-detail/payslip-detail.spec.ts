import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipDetail } from './payslip-detail';

describe('PayslipDetail', () => {
  let component: PayslipDetail;
  let fixture: ComponentFixture<PayslipDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayslipDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayslipDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
