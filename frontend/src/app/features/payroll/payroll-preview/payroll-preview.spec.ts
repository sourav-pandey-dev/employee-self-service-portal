import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollPreview } from './payroll-preview';

describe('PayrollPreview', () => {
  let component: PayrollPreview;
  let fixture: ComponentFixture<PayrollPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
