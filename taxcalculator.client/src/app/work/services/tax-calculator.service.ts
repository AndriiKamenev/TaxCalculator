import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConstant } from "../../app.constant";
import { SalaryInput, CalculationResult } from '../models/tax-calculator.model'; // Import the interfaces

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  // Use SalaryInput interface for request payload
  // Use CalculationResult interface for the response
  calculateTax(input: SalaryInput): Observable<CalculationResult> {
    return this.http.post<CalculationResult>(AppConstant.ApiResource.TaxCalculator.GET_CALCULATE_TAX(this.baseUrl), input);
  }
}

