import { Component } from '@angular/core';
import { DynamicField, DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { NotificationService } from '../../../core/services/notification.service';
import { PayrollService } from '../payroll.service';

@Component({ selector: 'app-payroll-inputs', standalone: true, imports: [DynamicForm], templateUrl: './payroll-inputs.html', styleUrl: './payroll-inputs.css' })
export class PayrollInputs {
  fields: DynamicField[] = [
    { name: 'employeeName', label: 'Employee Name', type: 'text', required: true },
    { name: 'month', label: 'Month', type: 'month', required: true },
    { name: 'basic', label: 'Basic Salary', type: 'number', required: true },
    { name: 'allowance', label: 'Allowance', type: 'number', required: true },
    { name: 'deduction', label: 'Deduction', type: 'number', required: true },
    { name: 'adjustment', label: 'Adjustment', type: 'number', required: true }
  ];
  constructor(private payroll: PayrollService, private notes: NotificationService) {}
  save(value: Record<string, string | number>): void {
    this.payroll.saveInput({ id: Date.now(), employeeName: String(value['employeeName']), month: String(value['month']), basic: Number(value['basic']), allowance: Number(value['allowance']), deduction: Number(value['deduction']), adjustment: Number(value['adjustment']) });
    this.notes.add('Payroll input saved.', 'Payroll');
  }
}
