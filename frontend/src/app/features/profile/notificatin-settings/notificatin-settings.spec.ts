import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatinSettings } from './notificatin-settings';

describe('NotificatinSettings', () => {
  let component: NotificatinSettings;
  let fixture: ComponentFixture<NotificatinSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificatinSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificatinSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
