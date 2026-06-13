import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css'
})
export class ProfileView {
  public auth = inject(AuthService);
  private profileService = inject(ProfileService);

  get pendingRequest() {
    const user = this.auth.currentUser();
    return user ? this.profileService.getPendingRequestForUser(user.id) : undefined;
  }
}
