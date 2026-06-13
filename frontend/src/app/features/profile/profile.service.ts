import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { User } from '../../core/models/user.model';

export interface ProfileUpdateRequest {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  requestedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  oldValues: {
    name: string;
    phone: string;
    department: string;
    designation: string;
  };
  newValues: {
    name: string;
    phone: string;
    department: string;
    designation: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private auth = inject(AuthService);
  private notes = inject(NotificationService);
  private http = inject(HttpClient);

  requests = signal<ProfileUpdateRequest[]>([]);

  constructor() {
    this.loadRequests();
  }

  private loadRequests(): void {
    this.http.get<ProfileUpdateRequest[]>('http://localhost:3000/profileRequests').subscribe({
      next: (data) => this.requests.set(data),
      error: (err) => console.error('Failed to load profile requests', err)
    });
  }

  getPendingRequestForUser(userId: number): ProfileUpdateRequest | undefined {
    return this.requests().find(req => req.userId === userId && req.status === 'Pending');
  }

  createRequest(
    userId: number,
    userName: string,
    userEmail: string,
    oldValues: ProfileUpdateRequest['oldValues'],
    newValues: ProfileUpdateRequest['newValues']
  ): void {
    const newRequest: ProfileUpdateRequest = {
      id: Date.now(),
      userId,
      userName,
      userEmail,
      requestedAt: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      oldValues,
      newValues
    };

    this.http.post<ProfileUpdateRequest>('http://localhost:3000/profileRequests', newRequest).subscribe({
      next: (saved) => {
        this.requests.update(items => [saved, ...items.filter(item => !(item.userId === userId && item.status === 'Pending'))]);
        this.notes.add('Profile changes submitted for admin approval.', 'Admin', userId);
      },
      error: (err) => console.error('Failed to create profile request', err)
    });
  }

  approveRequest(requestId: number): void {
    const existing = this.requests().find(r => r.id === requestId);
    if (!existing) {
      return;
    }
    const updated = { ...existing, status: 'Approved' as const };
    this.http.put<ProfileUpdateRequest>(`http://localhost:3000/profileRequests/${requestId}`, updated).subscribe({
      next: (saved) => {
        this.requests.update(items => items.map(item => item.id === requestId ? saved : item));
        
        const users = this.auth.getUsers();
        const user = users.find(u => u.id === saved.userId);
        if (user) {
          const updatedUser: User = {
            ...user,
            name: saved.newValues.name,
            phone: saved.newValues.phone,
            department: saved.newValues.department,
            designation: saved.newValues.designation
          };
          this.auth.updateProfile(updatedUser);
          this.notes.add(`Profile changes for ${saved.userName} approved.`, 'Admin', saved.userId);
        }
      },
      error: (err) => console.error('Failed to approve profile request', err)
    });
  }

  rejectRequest(requestId: number): void {
    const existing = this.requests().find(r => r.id === requestId);
    if (!existing) {
      return;
    }
    const updated = { ...existing, status: 'Rejected' as const };
    this.http.put<ProfileUpdateRequest>(`http://localhost:3000/profileRequests/${requestId}`, updated).subscribe({
      next: (saved) => {
        this.requests.update(items => items.map(item => item.id === requestId ? saved : item));
        this.notes.add(`Profile changes for ${saved.userName} rejected.`, 'Admin', saved.userId);
      },
      error: (err) => console.error('Failed to reject profile request', err)
    });
  }
}
