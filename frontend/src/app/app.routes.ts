import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { EmployeeDashboard } from './features/dashboard/employee-dashboard/employee-dashboard';
import { AdminDashboard } from './features/dashboard/admin-dashboard/admin-dashboard';
import { ProfileView } from './features/profile/profile-view/profile-view';
import { ProfileEdit } from './features/profile/profile-edit/profile-edit';
import { NotificatinSettings } from './features/profile/notificatin-settings/notificatin-settings';
import { LeaveApply } from './features/leave/leave-apply/leave-apply';
import { LeaveBalance } from './features/leave/leave-balance/leave-balance';
import { LeaveCalendar } from './features/leave/leave-calendar/leave-calendar';
import { AdminApprovals } from './features/leave/admin-approvals/admin-approvals';
import { MarkAttendence } from './features/attendence/mark-attendence/mark-attendence';
import { AttendenceHistory } from './features/attendence/attendence-history/attendence-history';
import { CorrectionRequest } from './features/attendence/correction-request/correction-request';
import { AdminRegularization } from './features/attendence/admin-regularization/admin-regularization';
import { PayslipList } from './features/payroll/payslip-list/payslip-list';
import { PayslipDetail } from './features/payroll/payslip-detail/payslip-detail';
import { PayrollInputs } from './features/payroll/payroll-inputs/payroll-inputs';
import { PayrollPreview } from './features/payroll/payroll-preview/payroll-preview';
import { NotificationList } from './features/notification/notification-list/notification-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: EmployeeDashboard, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: AdminDashboard, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'profile', component: ProfileView, canActivate: [authGuard] },
  { path: 'profile/edit', component: ProfileEdit, canActivate: [authGuard] },
  { path: 'profile/preferences', component: NotificatinSettings, canActivate: [authGuard] },
  { path: 'leave/apply', component: LeaveApply, canActivate: [authGuard] },
  { path: 'leave/balance', component: LeaveBalance, canActivate: [authGuard] },
  { path: 'leave/calendar', component: LeaveCalendar, canActivate: [authGuard] },
  { path: 'attendance', component: MarkAttendence, canActivate: [authGuard] },
  { path: 'attendance/history', component: AttendenceHistory, canActivate: [authGuard] },
  { path: 'attendance/correction', component: CorrectionRequest, canActivate: [authGuard] },
  { path: 'payroll', component: PayslipList, canActivate: [authGuard] },
  { path: 'payslip/:id', component: PayslipDetail, canActivate: [authGuard] },
  { path: 'notifications', component: NotificationList, canActivate: [authGuard] },
  { path: 'admin/approvals', component: AdminApprovals, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'admin/attendance', component: AdminRegularization, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'admin/payroll', component: PayrollInputs, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: 'admin/payroll-preview', component: PayrollPreview, canActivate: [authGuard, roleGuard], data: { roles: ['Admin'] } },
  { path: '**', redirectTo: 'dashboard' }
];
