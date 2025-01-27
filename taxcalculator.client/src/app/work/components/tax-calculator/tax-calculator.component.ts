import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax-calculator.service';
import { SalaryInput, CalculationResult } from '../../models/tax-calculator.model';

@Component({
  selector: 'app-tax-calculator',
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css'],
  standalone: false
})
export class TaxCalculatorComponent implements OnInit {
  taxForm!: FormGroup;
  calculationResult: CalculationResult | null = null;
  loading: boolean = false;

  constructor(private taxService: TaxService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taxForm = new FormGroup({
      grossAnnualSalary: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  calculateTax(): void {
    if (this.taxForm.valid) {
      this.loading = true;
      const input: SalaryInput = { grossAnnualSalary: this.taxForm.value.grossAnnualSalary };

      this.taxService.calculateTax(input).subscribe({
        next: (result) => {
          this.calculationResult = result;
          this.loading = false;
        },
        error: () => {
          this.calculationResult = null;
          this.loading = false;
        },
      });
    }
  }
}
