import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { PayrollService } from '../payroll.service';

@Component({ selector: 'app-payslip-list', standalone: true, imports: [CommonModule, RouterLink, CurrencyFormatPipe], templateUrl: './payslip-list.html', styleUrl: './payslip-list.css' })
export class PayslipList { constructor(public payroll: PayrollService) {} }
