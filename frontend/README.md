# Employee Leave, Attendance, and Payroll Self-Service Portal

Simple Angular 21 + TypeScript project for an employee self-service portal.

## Demo Login

- Employee: `employee@test.com` / `123456`
- Admin: `admin@test.com` / `123456`

## Main Features

- Login, logout, registration, role-based routing
- Employee profile and template-driven notification preferences
- Leave application, balance, calendar, and admin approval workflow
- NgRx is used only for the Leave Request and Approval Workflow
- Attendance marking, history, correction request, and admin regularization
- Payroll input dynamic form, payroll preview, payslip listing, and print view
- Notifications using Angular signals
- Custom validators for leave dates, leave balance, attendance remark, and payroll rules
- Custom pipes and directives
- HttpClient is configured with simple interceptors

## Run Project

```bash
npm install
npm start
```

Open `http://127.0.0.1:4200` or `http://localhost:4200`.

## Build

```bash
npm run build
```

## Component Diagram

```mermaid
flowchart TD
  App[App Component] --> Router[Angular Router]
  App --> Navbar[Navbar]
  Router --> Auth[Auth Components]
  Router --> Dashboard[Dashboard Components]
  Router --> Profile[Profile Components]
  Router --> Leave[Leave Components]
  Router --> Attendance[Attendance Components]
  Router --> Payroll[Payroll Components]
  Router --> Notifications[Notification Components]

  Auth --> AuthService[Auth Service]
  Profile --> AuthService
  Notifications --> NotificationService[Notification Service with Signals]
  Attendance --> AttendanceService[Attendance Service with Signals]
  Payroll --> PayrollService[Payroll Service]

  Leave --> Store[NgRx Store]
  Store --> Actions[Leave Actions]
  Store --> Reducer[Leave Reducer]
  Store --> Selectors[Leave Selectors]
  Store --> Effects[Leave Effects]
  Effects --> LeaveService[Leave Service]

  Shared[Shared Components, Pipes, Directives, Validators] --> Leave
  Shared --> Attendance
  Shared --> Payroll
```

## Use Case Diagram

```mermaid
flowchart LR
  Employee[Customer / Employee]
  Admin[Admin]

  Employee --> Login[Login and Logout]
  Employee --> Profile[Manage Profile]
  Employee --> Preferences[Set Notification Preferences]
  Employee --> ApplyLeave[Apply for Leave]
  Employee --> LeaveBalance[View Leave Balance]
  Employee --> MarkAttendance[Mark Attendance]
  Employee --> Correction[Request Attendance Correction]
  Employee --> Payslip[View and Print Payslip]
  Employee --> Alerts[View Notifications]

  Admin --> Login
  Admin --> LeaveApproval[Approve, Reject, or Return Leave]
  Admin --> AttendanceApproval[Approve Attendance Correction]
  Admin --> PayrollInput[Maintain Payroll Inputs]
  Admin --> PayrollPreview[Preview Payroll]
  Admin --> AdminAlerts[View Pending Alerts]
```
