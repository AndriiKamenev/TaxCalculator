import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaxService } from '../../services/tax-calculator.service';
import { SalaryInput, CalculationResult } from '../../models/tax-calculator.model'; // Import the interfaces


@Component({
  selector: 'app-tax-calculator',
  standalone: false,
  
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent implements OnInit {
  taxForm!: FormGroup;
  calculationResult: CalculationResult | null = null; 
  loading: boolean = false;

  constructor( private taxService: TaxService) {
   
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.taxForm = new FormGroup({
      grossAnnualSalary: new FormControl('', [Validators.required, Validators.min(0)])
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
          this.calculationResult = result; 
          this.loading = false;
        },
        error: (err) => {
          this.calculationResult = null; 
          this.loading = false;
        }
      });
    }
  }
}
