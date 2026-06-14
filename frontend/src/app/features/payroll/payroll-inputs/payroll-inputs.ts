import { Component, inject, OnInit, effect } from '@angular/core';
import { DynamicField, DynamicForm } from '../../../shared/components/dynamic-form/dynamic-form';
import { NotificationService } from '../../../core/services/notification.service';
import { PayrollService } from '../payroll.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-payroll-inputs',
  standalone: true,
  imports: [DynamicForm],
  templateUrl: './payroll-inputs.html',
  styleUrl: './payroll-inputs.css'
})
export class PayrollInputs implements OnInit {
  fields: DynamicField[] = [];

  private payroll = inject(PayrollService);
  private notes = inject(NotificationService);
  private auth = inject(AuthService);

  constructor() {
    effect(() => {
      const employees = this.auth.getUsers().filter(u => u.role !== 'Admin');
      const options = employees.map(emp => ({
        value: emp.id,
        label: `${emp.name} (${emp.designation || 'Employee'} - ${emp.department || 'Staff'})`
      }));

      this.fields = [
        { name: 'employeeId', label: 'Employee', type: 'select', required: true, options },
        { name: 'month', label: 'Month', type: 'month', required: true },
        { name: 'basic', label: 'Basic Salary', type: 'number', required: true },
        { name: 'adjustment', label: 'Adjustment (Bonus/LOP)', type: 'number', required: false }
      ];
    });
  }

  ngOnInit(): void {
  }

  save(value: Record<string, string | number>): void {
    const employeeId = Number(value['employeeId']);
    const employee = this.auth.getUsers().find(u => u.id === employeeId);
    if (!employee) {
      this.notes.add('Employee not found.', 'Payroll');
      return;
    }

    const basic = Number(value['basic']);
    const adjustment = Number(value['adjustment'] || 0);
    const month = String(value['month']);

    const hra = Math.round(basic * 0.40);
    const conveyance = 1600;
    const specialAllowance = Math.round(basic * 0.10);
    const allowance = hra + conveyance + specialAllowance;

    const pf = Math.round(basic * 0.12);
    const tdsRate = basic < 20000 ? 0 : (basic < 40000 ? 0.05 : 0.10);
    const tds = Math.round(basic * tdsRate);
    const professionalTax = 200;
    const insurance = 1000;
    const deduction = pf + tds + professionalTax + insurance;

    this.payroll.saveInput({
      id: Date.now(),
      employeeId,
      employeeName: employee.name,
      month,
      basic,
      allowance,
      deduction,
      adjustment,
      hra,
      conveyance,
      specialAllowance,
      pf,
      tds,
      professionalTax,
      insurance
    });

    this.notes.add(`Payroll input saved for ${employee.name}.`, 'Payroll');
  }
}
