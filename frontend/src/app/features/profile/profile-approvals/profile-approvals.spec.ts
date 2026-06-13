import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfileApprovals } from './profile-approvals';

describe('ProfileApprovals', () => {
  let component: ProfileApprovals;
  let fixture: ComponentFixture<ProfileApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileApprovals],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileApprovals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
