import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { AttendanceStatusPipe } from '../../../shared/pipes/attendence-status.pipe';
import { AuthService } from '../../../core/auth/auth.service';
import { AttendenceService } from '../attendence.service';

@Component({ selector: 'app-attendence-history', standalone: true, imports: [CommonModule, StatusBadge, AttendanceStatusPipe], templateUrl: './attendence-history.html', styleUrl: './attendence-history.css' })
export class AttendenceHistory {
  today = new Date();
  private todayKey = this.currentDateKey(this.today);

  constructor(public attendance: AttendenceService, private auth: AuthService) {}

  todaysRecords() {
    const userId = this.auth.currentUser()?.id;
    return this.attendance.records().filter(item => item.date === this.todayKey && String(item.employeeId) === String(userId));
  }

  private currentDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
