import { Injectable, signal } from '@angular/core';
import { AttendanceCorrection, AttendanceRecord } from '../../core/models/attendence.model';

@Injectable({ providedIn: 'root' })
export class AttendenceService {
  private today = this.currentDateKey();
  records = signal<AttendanceRecord[]>([
    { id: 1, employeeId: 1, date: this.today, checkIn: '09:30', checkOut: '18:00', status: 'Present' },
    { id: 2, employeeId: 1, date: this.offsetDateKey(-2), checkIn: '', checkOut: '', status: 'Absent' },
    { id: 3, employeeId: 1, date: this.offsetDateKey(-5), checkIn: '', checkOut: '', status: 'Absent' }
  ]);
  corrections = signal<AttendanceCorrection[]>([]);
  hasMarkedToday(employeeId: number): boolean {
    const today = this.currentDateKey();
    return this.records().some(item => String(item.employeeId) === String(employeeId) && item.date === today);
  }

  mark(employeeId: number): 'created' | 'existing' {
    const today = this.currentDateKey();
    const hasToday = this.hasMarkedToday(employeeId);
    if (hasToday) {
      return 'existing';
    }
    const now = new Date();
    const checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const record: AttendanceRecord = { id: Date.now(), employeeId, date: today, checkIn: checkInTime, checkOut: '', status: 'Present' };
    this.records.update(items => [record, ...items]);
    return 'created';
  }
  requestCorrection(item: AttendanceCorrection): void { this.corrections.update(items => [item, ...items]); }
  updateCorrection(id: number, status: 'Approved' | 'Rejected'): void { this.corrections.update(items => items.map(item => item.id === id ? { ...item, status } : item)); }

  private currentDateKey(): string {
    return this.formatDateKey(new Date());
  }

  private offsetDateKey(offset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return this.formatDateKey(date);
  }

  private formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
