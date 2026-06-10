import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { PayrollService } from '../payroll.service';

@Component({ selector: 'app-payroll-preview', standalone: true, imports: [CommonModule, CurrencyFormatPipe], templateUrl: './payroll-preview.html', styleUrl: './payroll-preview.css' })
export class PayrollPreview { constructor(public payroll: PayrollService) {} }
