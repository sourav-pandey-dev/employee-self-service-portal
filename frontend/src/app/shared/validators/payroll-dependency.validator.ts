import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function payrollDependencyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowance = Number(control.get('allowance')?.value || 0);
    const adjustment = Number(control.get('adjustment')?.value || 0);
    const deduction = Number(control.get('deduction')?.value || 0);
    if (adjustment > 0 && allowance <= 0) {
      return { payrollDependency: 'Allowance is required when adjustment is entered.' };
    }
    return deduction >= 0 ? null : { payrollDependency: 'Deduction cannot be negative.' };
  };
}
