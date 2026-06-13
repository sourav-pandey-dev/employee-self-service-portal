import { Injectable, signal, inject } from '@angular/core';
import { AttendanceCorrection, AttendanceRecord } from '../../core/models/attendence.model';
import { NotificationService } from '../../core/services/notification.service';

@Injectable({ providedIn: 'root' })
export class AttendenceService {
  private notes = inject(NotificationService);
  private today = this.currentDateKey();
  records = signal<AttendanceRecord[]>([
    { id: 1, employeeId: 1, date: this.today, checkIn: '09:30', checkOut: '18:00', status: 'Present' },
    { id: 2, employeeId: 1, date: this.offsetDateKey(-2), checkIn: '', checkOut: '', status: 'Absent' },
    { id: 3, employeeId: 1, date: this.offsetDateKey(-5), checkIn: '', checkOut: '', status: 'Absent' }
  ]);
  corrections = signal<AttendanceCorrection[]>([]);
  mark(employeeId: number): 'created' | 'existing' {
    const today = this.currentDateKey();
    const hasToday = this.records().some(item => item.employeeId === employeeId && item.date === today);
    const record: AttendanceRecord = { id: Date.now(), employeeId, date: today, checkIn: '09:30', checkOut: '18:00', status: 'Present' };
    this.records.update(items => {
      return hasToday ? items.map(item => item.employeeId === employeeId && item.date === today ? { ...item, ...record, id: item.id } : item) : [record, ...items];
    });
    return hasToday ? 'existing' : 'created';
  }
  requestCorrection(item: AttendanceCorrection): void { this.corrections.update(items => [item, ...items]); }
  updateCorrection(id: number, status: 'Approved' | 'Rejected'): void {
    const existing = this.corrections().find(item => item.id === id);
    if (!existing) return;
    this.corrections.update(items => items.map(item => item.id === id ? { ...item, status } : item));
    // also update corresponding record status in records() if approved
    if (status === 'Approved') {
      const rec = this.records().find(r => r.employeeId === existing.employeeId && r.date === existing.date);
      if (rec) {
        this.records.update(items => items.map(item => item.id === rec.id ? { ...item, status: existing.requestedStatus } : item));
      } else {
        this.records.update(items => [{ id: Date.now(), employeeId: existing.employeeId, date: existing.date, checkIn: '09:30', checkOut: '18:00', status: existing.requestedStatus }, ...items]);
      }
    }
    this.notes.add(`Attendance correction for ${existing.date} has been ${status.toLowerCase()}.`, 'Attendance', existing.employeeId);
  }

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
