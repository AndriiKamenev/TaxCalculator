// Interface for SalaryInput
export interface SalaryInput {
  grossAnnualSalary: number; // Matches GrossAnnualSalary from the backend
}

// Interface for CalculationResult
export interface CalculationResult {
  grossAnnualSalary: number; // Matches GrossAnnualSalary from the backend
  grossMonthlySalary: number; // Matches GrossMonthlySalary from the backend
  netAnnualSalary: number;   // Matches NetAnnualSalary from the backend
  netMonthlySalary: number;   // Matches NetMonthlySalary from the backend
  annualTaxPaid: number;     // Matches AnnualTaxPaid from the backend
  monthlyTaxPaid: number;    // Matches MonthlyTaxPaid from the backend
}
