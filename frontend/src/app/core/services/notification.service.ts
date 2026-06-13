import { Injectable, signal, computed, inject } from '@angular/core';
import { AppNotification } from '../models/notification.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private auth = inject(AuthService);

  notifications = signal<AppNotification[]>([
    { id: 1, message: 'Welcome to the employee portal.', type: 'Admin', read: false, createdAt: new Date().toISOString() },
    { id: 2, message: 'May payslip is available.', type: 'Payroll', read: false, createdAt: new Date().toISOString(), employeeId: 1 }
  ]);

  userNotifications = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return [];
    if (user.role === 'Admin') {
      return this.notifications().filter(note => note.type === 'Admin' || !note.employeeId);
    } else {
      return this.notifications().filter(note => note.employeeId === user.id || (!note.employeeId && note.type !== 'Admin'));
    }
  });

  add(message: string, type: AppNotification['type'], employeeId?: number): void {
    const note: AppNotification = { id: Date.now(), message, type, read: false, createdAt: new Date().toISOString(), employeeId };
    this.notifications.update(items => [note, ...items]);
  }

  markAllRead(): void {
    const visibleIds = new Set(this.userNotifications().map(n => n.id));
    this.notifications.update(items => items.map(item => visibleIds.has(item.id) ? { ...item, read: true } : item));
  }

  markRead(id: number): void {
    this.notifications.update(items => items.map(item => item.id === id ? { ...item, read: true } : item));
  }
}
