import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AttendenceService } from '../../attendence/attendence.service';
import { changeLeaveStatus, loadLeaves } from '../../leave/store/leave.action';
import { selectAllLeaves } from '../../leave/store/leave.selectors';

@Component({ selector: 'app-employee-dashboard', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './employee-dashboard.html', styleUrl: './employee-dashboard.css' })
export class EmployeeDashboard {
  public auth = inject(AuthService);
  public notification = inject(NotificationService);
  private attendance = inject(AttendenceService);
  private store = inject(Store);
  today = new Date();
  monthLabel = this.today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  leaves$ = this.store.select(selectAllLeaves);
  unreadCount = computed(() => this.notification.userNotifications().filter(item => !item.read).length);
  calendarDays = computed(() => this.buildCalendarDays());
  selectedLeave: any = null;

  constructor() {
    this.store.dispatch(loadLeaves());
  }

  viewLeave(leave: any): void {
    this.selectedLeave = leave;
  }

  closeLeaveModal(): void {
    this.selectedLeave = null;
  }

  cancelLeave(id: number): void {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      this.store.dispatch(changeLeaveStatus({ id, status: 'Cancelled' }));
      this.notification.add('Leave request cancelled.', 'Leave');
    }
  }

  private buildCalendarDays() {
    const year = this.today.getFullYear();
    const month = this.today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const userId = this.auth.currentUser()?.id;
    const records = this.attendance.records().filter(record => record.employeeId === userId);
    const days: Array<{ day: number | null; date: string; status: string; today: boolean }> = [];

    for (let index = 0; index < firstDay; index++) {
      days.push({ day: null, date: '', status: '', today: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = this.dateKey(year, month, day);
      const dayRecords = records.filter(record => record.date === date);
      const isAbsent = dayRecords.some(record => record.status === 'Absent');
      const isPresent = dayRecords.some(record => record.status === 'Present');
      days.push({
        day,
        date,
        status: isAbsent ? 'absent' : isPresent ? 'present' : '',
        today: date === this.dateKey(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
      });
    }

    return days;
  }

  private dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
}
