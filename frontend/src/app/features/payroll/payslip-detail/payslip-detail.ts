import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { PayrollService } from '../payroll.service';

@Component({ selector: 'app-payslip-detail', standalone: true, imports: [CommonModule, CurrencyFormatPipe], templateUrl: './payslip-detail.html', styleUrl: './payslip-detail.css' })
export class PayslipDetail {
  private route = inject(ActivatedRoute); private payroll = inject(PayrollService);
  payslip = this.payroll.getPayslip(Number(this.route.snapshot.paramMap.get('id')));
  print(): void { window.print(); }
}
