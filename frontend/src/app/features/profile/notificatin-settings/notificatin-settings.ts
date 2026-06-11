import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-notificatin-settings', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './notificatin-settings.html', styleUrl: './notificatin-settings.css' })
export class NotificatinSettings {
  preferences = { emailAlerts: true, smsAlerts: false, communicationMode: 'Email' };
  saved = false;
  save(): void { localStorage.setItem('portal_preferences', JSON.stringify(this.preferences)); this.saved = true; }
}
