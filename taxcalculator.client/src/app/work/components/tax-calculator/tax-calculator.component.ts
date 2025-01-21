import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax-calculator.service';
import { SalaryInput, CalculationResult } from '../../models/tax-calculator.model'; // Import the interfaces


@Component({
  selector: 'app-tax-calculator',
  standalone: false,
  
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent implements OnInit {
  taxForm: FormGroup;
  calculationResult: CalculationResult | null = null; // Use CalculationResult interface
  loading: boolean = false;

  constructor(private fb: FormBuilder, private taxService: TaxService) {
    this.taxForm = this.fb.group({
      grossAnnualSalary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taxForm = this.fb.group({
      grossAnnualSalary: [
        '',
        [Validators.required, Validators.min(0)] // Validators for the input
      ]
    });
  }

  calculateTax() {
    if (this.taxForm.valid) {
      this.loading = true;

      // Use SalaryInput interface for form data
      const input: SalaryInput = {
        grossAnnualSalary: this.taxForm.value.grossAnnualSalary
      };

      this.taxService.calculateTax(input).subscribe({
        next: (result: CalculationResult) => {
          this.calculationResult = result; // Assign the result
          this.loading = false;
        },
        error: (err) => {
          this.calculationResult = null; // Reset on error
          this.loading = false;
        }
      });
    }
  }
}
