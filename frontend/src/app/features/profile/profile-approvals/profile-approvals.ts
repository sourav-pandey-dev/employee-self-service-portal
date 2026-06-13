import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-approvals.html',
  styleUrl: './profile-approvals.css'
})
export class ProfileApprovals {
  private profileService = inject(ProfileService);

  get pendingRequests() {
    return this.profileService.requests().filter(r => r.status === 'Pending');
  }

  approve(id: number): void {
    this.profileService.approveRequest(id);
  }

  reject(id: number): void {
    this.profileService.rejectRequest(id);
  }
}
