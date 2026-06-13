import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { PayrollService } from '../payroll/payroll.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-employees.html',
  styleUrl: './admin-employees.css'
})
export class AdminEmployees implements OnInit {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private notes = inject(NotificationService);
  private payroll = inject(PayrollService);

  employees: User[] = [];
  showEditModal = false;
  showPayrollModal = false;
  editingEmployee: User | null = null;
  payrollEmployee: User | null = null;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    designation: ['', Validators.required]
  });

  payrollForm: FormGroup = this.fb.group({
    month: ['', Validators.required],
    basic: ['', [Validators.required, Validators.min(0)]],
    adjustment: [0]
  });

  constructor() {
    effect(() => {
      this.loadEmployees();
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.auth.getUsers().filter(u => u.role !== 'Admin');
  }

  openEdit(employee: User): void {
    this.editingEmployee = employee;
    this.form.patchValue(employee);
    this.showEditModal = true;
  }

  closeEdit(): void {
    this.editingEmployee = null;
    this.form.reset();
    this.showEditModal = false;
  }

  saveChanges(): void {
    if (this.form.invalid || !this.editingEmployee) {
      return;
    }

    const value = this.form.value;
    const updated: User = {
      ...this.editingEmployee,
      name: value.name || '',
      phone: value.phone || '',
      department: value.department || '',
      designation: value.designation || ''
    };

    this.auth.updateProfile(updated);
    this.notes.add(`Details for employee ${updated.name} updated successfully.`, 'Admin', updated.id);
    this.loadEmployees();
    this.closeEdit();
  }

  openPayroll(employee: User): void {
    this.payrollEmployee = employee;
    const existingInputs = this.payroll.payrollInputs().filter(p => p.employeeId === employee.id);
    const defaultBasic = existingInputs.length > 0 ? existingInputs[0].basic : '';
    this.payrollForm.reset({
      month: new Date().toISOString().slice(0, 7),
      basic: defaultBasic,
      adjustment: 0
    });
    this.showPayrollModal = true;
  }

  closePayroll(): void {
    this.payrollEmployee = null;
    this.payrollForm.reset();
    this.showPayrollModal = false;
  }

  savePayroll(): void {
    if (this.payrollForm.invalid || !this.payrollEmployee) {
      return;
    }

    const value = this.payrollForm.value;
    const basic = Number(value.basic);
    const adjustment = Number(value.adjustment || 0);
    const month = String(value.month);

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
      employeeId: this.payrollEmployee.id,
      employeeName: this.payrollEmployee.name,
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

    this.notes.add(`Payroll input saved for ${this.payrollEmployee.name}.`, 'Admin');
    this.notes.add(`Your payroll for ${month} has been published.`, 'Payroll', this.payrollEmployee.id);
    this.closePayroll();
  }
}
