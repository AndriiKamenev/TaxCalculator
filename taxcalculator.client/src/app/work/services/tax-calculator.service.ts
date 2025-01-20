import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaryInput, CalculationResult } from '../models/tax-calculator.model'; // Import the interfaces
import { AppConstant } from "../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  constructor(private http: HttpClient) { }

  // Use SalaryInput interface for request payload
  // Use CalculationResult interface for the response
  calculateTax(input: SalaryInput): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(AppConstant.ApiResource.TaxCalculator.GET_CALCULATE_TAX(), input);
  }
}
