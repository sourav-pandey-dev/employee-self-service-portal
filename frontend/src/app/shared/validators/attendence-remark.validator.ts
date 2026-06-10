import { AbstractControl, ValidationErrors } from '@angular/forms';

export function attendanceRemarkValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '').trim();
  return value.length >= 10 ? null : { attendanceRemark: true };
}
