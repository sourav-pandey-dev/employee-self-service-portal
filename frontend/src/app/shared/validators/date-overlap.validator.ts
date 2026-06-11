import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateOverlapValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;
    if (!fromDate || !toDate) {
      return null;
    }
    return new Date(fromDate) <= new Date(toDate) ? null : { dateOverlap: true };
  };
}
