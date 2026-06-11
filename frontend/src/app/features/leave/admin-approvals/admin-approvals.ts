import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { HighlightRowDirective } from '../../../shared/directives/highlight-row.directive';
import { NotificationService } from '../../../core/services/notification.service';
import { changeLeaveStatus, loadLeaves } from '../store/leave.action';
import { selectPendingLeaves } from '../store/leave.selectors';

@Component({ selector: 'app-admin-approvals', standalone: true, imports: [CommonModule, StatusBadge, HighlightRowDirective], templateUrl: './admin-approvals.html', styleUrl: './admin-approvals.css' })
export class AdminApprovals {
  private store = inject(Store); private notes = inject(NotificationService);
  pending$ = this.store.select(selectPendingLeaves);
  constructor() { this.store.dispatch(loadLeaves()); }
  update(id: number, status: 'Approved' | 'Rejected' | 'Correction'): void { this.store.dispatch(changeLeaveStatus({ id, status, remark: status })); this.notes.add(`Leave ${status.toLowerCase()}.`, 'Leave'); }
}
