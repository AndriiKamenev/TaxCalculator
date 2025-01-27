import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../../angular-material.module';

import { TaxService } from '../../services/tax-calculator.service';
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxVisualizeComponent } from './../../../work/components/tax-visualize/tax-visualize.component';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;
  let taxServiceMock: jasmine.SpyObj<TaxService>;

  beforeEach(async () => {
    // Create a spy object for TaxService
    taxServiceMock = jasmine.createSpyObj('TaxService', ['calculateTax']);

    // Define the mock response for calculateTax
    const mockCalculationResult = {
      grossAnnualSalary: 30000,
      grossMonthlySalary: 2500,
      netAnnualSalary: 24000,
      netMonthlySalary: 2000,
      annualTaxPaid: 6000,
      monthlyTaxPaid: 500
    };


    // Mock the method calculateTax to return the mock result as an observable
    taxServiceMock.calculateTax.and.returnValue(of(mockCalculationResult));

    await TestBed.configureTestingModule({
      declarations: [TaxCalculatorComponent,
        TaxVisualizeComponent
      ],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TaxService, useValue: taxServiceMock }, // Provide mock service
      ],
      //schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //it('should call calculateTax and set calculationResult on success', () => {
  //  const mockCalculationResult: CalculationResult = {
  //    grossAnnualSalary: 30000,
  //    grossMonthlySalary: 2500,
  //    netAnnualSalary: 24000,
  //    netMonthlySalary: 2000,
  //    annualTaxPaid: 6000,
  //    monthlyTaxPaid: 500,
  //  };

  //  taxServiceMock.calculateTax.and.returnValue(of(mockCalculationResult)); // Mock successful response

  //  component.taxForm.get('grossAnnualSalary')?.setValue(30000);
  //  component.calculateTax();

  //  expect(taxServiceMock.calculateTax).toHaveBeenCalledWith({ grossAnnualSalary: 30000 });
  //  expect(component.calculationResult).toEqual(mockCalculationResult);
  //  expect(component.loading).toBeFalse();
  //});
});
