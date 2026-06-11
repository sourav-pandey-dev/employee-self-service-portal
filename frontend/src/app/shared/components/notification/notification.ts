import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({ selector: 'app-notification', standalone: true, imports: [CommonModule], templateUrl: './notification.html', styleUrl: './notification.css' })
export class Notification {
  constructor(public notificationService: NotificationService) {}
}
