export type AttendanceStatus = 'Present' | 'Absent' | 'Half Day' | 'Correction Pending' | 'Corrected';

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

export interface AttendanceCorrection {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  requestedStatus: AttendanceStatus;
  remark: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
