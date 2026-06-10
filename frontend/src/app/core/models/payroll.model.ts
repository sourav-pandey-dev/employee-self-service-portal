export interface PayrollInput {
  id: number;
  employeeName: string;
  month: string;
  basic: number;
  allowance: number;
  deduction: number;
  adjustment: number;
}

export interface Payslip extends PayrollInput {
  netPay: number;
  generatedOn: string;
}
