export interface PayrollInput {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string;
  basic: number;
  allowance: number;
  deduction: number;
  adjustment: number;

  hra: number;
  conveyance: number;
  specialAllowance: number;

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
