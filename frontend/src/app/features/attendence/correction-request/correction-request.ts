import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { attendanceRemarkValidator } from '../../../shared/validators/attendence-remark.validator';
import { AttendenceService } from '../attendence.service';

@Component({ selector: 'app-correction-request', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './correction-request.html', styleUrl: './correction-request.css' })
export class CorrectionRequest {
  private fb = inject(FormBuilder); private auth = inject(AuthService); private attendance = inject(AttendenceService); private notes = inject(NotificationService);
  form = this.fb.group({ date: ['', Validators.required], requestedStatus: ['Present', Validators.required], remark: ['', attendanceRemarkValidator] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const user = this.auth.currentUser(); if (!user) return; this.attendance.requestCorrection({ id: Date.now(), employeeId: user.id, employeeName: user.name, date: this.form.value.date || '', requestedStatus: this.form.value.requestedStatus as any, remark: this.form.value.remark || '', status: 'Pending' }); this.notes.add('Attendance correction sent to admin.', 'Attendance'); this.form.reset({ requestedStatus: 'Present' }); }
}
