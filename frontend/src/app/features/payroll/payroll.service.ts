import { Injectable, signal } from '@angular/core';
import { PayrollInput, Payslip } from '../../core/models/payroll.model';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  payrollInputs = signal<PayrollInput[]>([
    { id: 1, employeeName: 'Asha Employee', month: '2026-05', basic: 45000, allowance: 8000, deduction: 2500, adjustment: 1000 }
  ]);

  saveInput(input: PayrollInput): void {
    this.payrollInputs.update(items => [input, ...items]);
  }

  payslips(): Payslip[] {
    return this.payrollInputs().map(item => ({ ...item, netPay: item.basic + item.allowance + item.adjustment - item.deduction, generatedOn: new Date().toISOString().slice(0, 10) }));
  }

  getPayslip(id: number): Payslip | undefined {
    return this.payslips().find(item => item.id === id);
  }
}
