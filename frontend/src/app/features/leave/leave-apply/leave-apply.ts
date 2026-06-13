import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { dateOverlapValidator } from '../../../shared/validators/date-overlap.validator';
import { leaveBalanceValidator } from '../../../shared/validators/leave-based.validator';
import { applyLeave, loadLeaves, updateLeave } from '../store/leave.action';
import { selectAllLeaves } from '../store/leave.selectors';
import { LeaveRequest } from '../../../core/models/leave.model';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({ selector: 'app-leave-apply', standalone: true, imports: [CommonModule, ReactiveFormsModule, StatusBadge], templateUrl: './leave-apply.html', styleUrl: './leave-apply.css' })
export class LeaveApply implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private auth = inject(AuthService);
  private notes = inject(NotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  leaves$ = this.store.select(selectAllLeaves);
  form = this.fb.group({
    type: ['Casual', Validators.required],
    fromDate: ['', Validators.required],
    toDate: ['', Validators.required],
    reason: ['', Validators.required]
  }, { validators: [dateOverlapValidator(), leaveBalanceValidator(12)] });

  editMode = false;
  editingLeaveId: number | null = null;

  constructor() { this.store.dispatch(loadLeaves()); }
  apply(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const value = this.form.getRawValue(); const oneDay = 24 * 60 * 60 * 1000; const days = Math.floor((new Date(value.toDate || '').getTime() - new Date(value.fromDate || '').getTime()) / oneDay) + 1; const user = this.auth.currentUser(); if (!user) return; this.store.dispatch(applyLeave({ leave: { id: Date.now(), employeeId: user.id, employeeName: user.name, type: value.type as any, fromDate: value.fromDate || '', toDate: value.toDate || '', days, reason: value.reason || '', status: 'Pending' } })); this.notes.add('Leave request submitted.', 'Leave', user.id); this.form.reset({ type: 'Casual' }); }
}
