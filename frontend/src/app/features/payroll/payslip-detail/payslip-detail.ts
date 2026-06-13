import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { PayrollService } from '../payroll.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Payslip } from '../../../core/models/payroll.model';

@Component({
  selector: 'app-payslip-detail',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  templateUrl: './payslip-detail.html',
  styleUrl: './payslip-detail.css'
})
export class PayslipDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private payroll = inject(PayrollService);
  private auth = inject(AuthService);

  payslip: Payslip | undefined;
  accessDenied = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const rawPayslip = this.payroll.getPayslip(id);
    const currentUser = this.auth.currentUser();

    if (!rawPayslip) {
      this.payslip = undefined;
      return;
    }

    if (!currentUser) {
      this.accessDenied = true;
      return;
    }

    // Security Check: admins can see all, employees can only see their own payslips
    if (currentUser.role !== 'Admin' && rawPayslip.employeeId !== currentUser.id && rawPayslip.employeeName !== currentUser.name) {
      this.accessDenied = true;
    } else {
      this.payslip = rawPayslip;
    }
  }

  print(): void {
    window.print();
  }
}
