import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminEmployees } from './admin-employees';

describe('AdminEmployees', () => {
  let component: AdminEmployees;
  let fixture: ComponentFixture<AdminEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployees],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
