export interface AppNotification {
  id: number;
  message: string;
  type: 'Leave' | 'Attendance' | 'Payroll' | 'Admin';
  read: boolean;
  createdAt: string;
}
