import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { PayrollService } from '../payroll.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Payslip } from '../../../core/models/payroll.model';

@Component({
  selector: 'app-payslip-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyFormatPipe],
  templateUrl: './payslip-list.html',
  styleUrl: './payslip-list.css'
})
export class PayslipList {
  private payroll = inject(PayrollService);
  private auth = inject(AuthService);

  get filteredPayslips(): Payslip[] {
    const user = this.auth.currentUser();
    if (!user) {
      return [];
    }
    const allPayslips = this.payroll.payslips();
    if (user.role === 'Admin') {
      return allPayslips;
    }
    // Filter for regular employee
    return allPayslips.filter(item => item.employeeId === user.id || item.employeeName === user.name);
  }
}
