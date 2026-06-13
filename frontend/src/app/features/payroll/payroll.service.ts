import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollInput, Payslip } from '../../core/models/payroll.model';

@Injectable({ providedIn: 'root' })
export class PayrollService {
  payrollInputs = signal<PayrollInput[]>([]);

  constructor(private http: HttpClient) {
    this.loadInputs();
  }

  private loadInputs(): void {
    this.http.get<PayrollInput[]>('http://localhost:3000/payroll').subscribe({
      next: (data) => this.payrollInputs.set(data),
      error: (err) => console.error('Failed to load payroll inputs', err)
    });
  }

  saveInput(input: PayrollInput): void {
    this.http.post<PayrollInput>('http://localhost:3000/payroll', input).subscribe({
      next: (saved) => {
        this.payrollInputs.update(items => [saved, ...items]);
      },
      error: (err) => console.error('Failed to save payroll input', err)
    });
  }

  payslips(): Payslip[] {
    return this.payrollInputs().map(item => {
      const grossEarnings = item.basic + (item.allowance || 0) + (item.adjustment > 0 ? item.adjustment : 0);
      const totalDeductions = (item.deduction || 0) + (item.adjustment < 0 ? -item.adjustment : 0);
      return {
        ...item,
        grossEarnings,
        totalDeductions,
        netPay: item.basic + (item.allowance || 0) + item.adjustment - (item.deduction || 0),
        generatedOn: new Date().toISOString().slice(0, 10)
      };
    });
  }

  getPayslip(id: number): Payslip | undefined {
    return this.payslips().find(item => item.id === id);
  }
}
