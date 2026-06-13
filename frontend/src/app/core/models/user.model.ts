export type UserRole = 'Employee' | 'Admin';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  designation: string;
  phone: string;
  joinDate: string;
  profileImage?: string;
}

export interface ProfilePreferences {
  emailAlerts: boolean;
  smsAlerts: boolean;
  communicationMode: 'Email' | 'SMS' | 'Both';
}
