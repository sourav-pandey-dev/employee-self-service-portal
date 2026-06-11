import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'attendanceStatus', standalone: true })
export class AttendanceStatusPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'Correction Pending' ? 'Needs Approval' : value;
  }
}
