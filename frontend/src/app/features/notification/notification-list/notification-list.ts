import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({ selector: 'app-notification-list', standalone: true, imports: [CommonModule], templateUrl: './notification-list.html', styleUrl: './notification-list.css' })
export class NotificationList {
  unreadCount = computed(() => this.notes.notifications().filter(note => !note.read).length);

  constructor(public notes: NotificationService) {}
}
