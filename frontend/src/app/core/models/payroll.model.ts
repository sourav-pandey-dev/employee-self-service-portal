export interface PayrollInput {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string;
  basic: number;
  allowance: number;
  deduction: number;
  adjustment: number;

  // Earnings breakdown
  hra: number;
  conveyance: number;
  specialAllowance: number;

  // Deductions breakdown
  pf: number;
  tds: number;
  professionalTax: number;
  insurance: number;
}

export interface Payslip extends PayrollInput {
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  generatedOn: string;
}
