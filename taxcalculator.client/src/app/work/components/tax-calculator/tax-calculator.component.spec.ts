import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxService } from '../../services/tax-calculator.service';
import { of, throwError } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;
  let taxServiceMock: jasmine.SpyObj<TaxService>;

  beforeEach(async () => {
    // Create a spy object for the TaxService
    taxServiceMock = jasmine.createSpyObj('TaxService', ['calculateTax']);

    // Configure the testing module
    await TestBed.configureTestingModule({
      declarations: [TaxCalculatorComponent],
      imports: [ReactiveFormsModule, MatButtonModule], // Only import necessary modules
      providers: [{ provide: TaxService, useValue: taxServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignore unknown child components like <app-tax-visualize>
    }).compileComponents();  // Make sure this completes before proceeding
  });

  beforeEach(() => {
    // Create the component and fixture after TestBed setup is complete
    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.taxForm).toBeTruthy();
    expect(component.taxForm.get('grossAnnualSalary')?.value).toBe('');
  });

  it('should call calculateTax and update calculationResult on success', () => {
    const mockCalculationResult = {
      grossAnnualSalary: 30000,
      grossMonthlySalary: 2500,
      netAnnualSalary: 24000,
      netMonthlySalary: 2000,
      annualTaxPaid: 6000,
      monthlyTaxPaid: 500
    };

    // Mock the response for calculateTax
    taxServiceMock.calculateTax.and.returnValue(of(mockCalculationResult));

    // Set valid input
    component.taxForm.get('grossAnnualSalary')?.setValue(30000);
    component.calculateTax();

    expect(taxServiceMock.calculateTax).toHaveBeenCalledWith({ grossAnnualSalary: 30000 });
    expect(component.calculationResult).toEqual(mockCalculationResult);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when calculateTax fails', () => {
    taxServiceMock.calculateTax.and.returnValue(throwError(() => new Error('API Error')));

    component.taxForm.get('grossAnnualSalary')?.setValue(30000);
    component.calculateTax();

    expect(taxServiceMock.calculateTax).toHaveBeenCalledWith({ grossAnnualSalary: 30000 });
    expect(component.calculationResult).toBeNull();
    expect(component.loading).toBeFalse();
  });

  it('should disable the submit button when the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    component.taxForm.get('grossAnnualSalary')?.setValue('');
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when the form is valid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    component.taxForm.get('grossAnnualSalary')?.setValue(30000);
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });
});
