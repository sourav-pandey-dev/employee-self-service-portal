import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegularization } from './admin-regularization';

describe('AdminRegularization', () => {
  let component: AdminRegularization;
  let fixture: ComponentFixture<AdminRegularization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRegularization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegularization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
