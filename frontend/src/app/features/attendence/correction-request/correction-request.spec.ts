import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionRequest } from './correction-request';

describe('CorrectionRequest', () => {
  let component: CorrectionRequest;
  let fixture: ComponentFixture<CorrectionRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectionRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectionRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
