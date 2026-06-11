import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollInputs } from './payroll-inputs';

describe('PayrollInputs', () => {
  let component: PayrollInputs;
  let fixture: ComponentFixture<PayrollInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollInputs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
