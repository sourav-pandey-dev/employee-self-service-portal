import { Injectable, signal } from '@angular/core';
import { AppNotification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  notifications = signal<AppNotification[]>([
    { id: 1, message: 'Welcome to the employee portal.', type: 'Admin', read: false, createdAt: new Date().toISOString() },
    { id: 2, message: 'May payslip is available.', type: 'Payroll', read: false, createdAt: new Date().toISOString() }
  ]);

  add(message: string, type: AppNotification['type']): void {
    const note: AppNotification = { id: Date.now(), message, type, read: false, createdAt: new Date().toISOString() };
    this.notifications.update(items => [note, ...items]);
  }

  markAllRead(): void {
    this.notifications.update(items => items.map(item => ({ ...item, read: true })));
  }

  markRead(id: number): void {
    this.notifications.update(items => items.map(item => item.id === id ? { ...item, read: true } : item));
  }
}
