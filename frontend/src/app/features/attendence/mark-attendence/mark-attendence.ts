import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AttendenceService } from '../attendence.service';

@Component({ selector: 'app-mark-attendence', standalone: true, imports: [RouterLink], templateUrl: './mark-attendence.html', styleUrl: './mark-attendence.css' })
export class MarkAttendence {
  constructor(private auth: AuthService, private attendance: AttendenceService, private notes: NotificationService) {}
  mark(): void {
    const user = this.auth.currentUser();
    if (!user) return;
    const result = this.attendance.mark(user.id);
    this.notes.add(result === 'created' ? 'Attendance marked for today.' : 'Today attendance is already marked.', 'Attendance', user.id);
  }
}
