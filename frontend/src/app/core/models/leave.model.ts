export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Correction' | 'Cancelled';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  type: 'Casual' | 'Sick' | 'Earned';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  adminRemark?: string;
}

export interface LeaveBalance {
  type: 'Casual' | 'Sick' | 'Earned';
  total: number;
  used: number;
}
