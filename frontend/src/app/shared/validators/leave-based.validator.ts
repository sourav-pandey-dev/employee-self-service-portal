import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function leaveBalanceValidator(maxDays: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;
    if (!fromDate || !toDate) {
      return null;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((new Date(toDate).getTime() - new Date(fromDate).getTime()) / oneDay) + 1;
    return days <= maxDays ? null : { leaveBalance: true };
  };
}
