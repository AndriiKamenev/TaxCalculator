import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxVisualizeComponent } from './tax-visualize.component';
import { CustomGbpCurrencyPipe } from '../../pipes/custom-gbp-currency.pipe'; 
import { CalculationResult } from '../../models/tax-calculator.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CurrencyPipe } from '@angular/common'; // Required for the CustomGbpCurrencyPipe

describe('TaxVisualizeComponent', () => {
  let component: TaxVisualizeComponent;
  let fixture: ComponentFixture<TaxVisualizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TaxVisualizeComponent,
        CustomGbpCurrencyPipe 
      ],
      providers: [CurrencyPipe], // Provide CurrencyPipe since CustomGbpCurrencyPipe uses it
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Handle Angular Material components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxVisualizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display calculation results when calculationResult is provided', () => {
    const mockCalculationResult: CalculationResult = {
      grossAnnualSalary: 40000,
      grossMonthlySalary: 3333.33,
      netAnnualSalary: 29000,
      netMonthlySalary: 2416.67,
      annualTaxPaid: 11000,
      monthlyTaxPaid: 916.67,
    };

    component.calculationResult = mockCalculationResult;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const resultItems = compiled.querySelectorAll('.result-item');

    expect(resultItems[0]?.textContent).toContain('Gross Annual Salary: £40000');
    expect(resultItems[1]?.textContent).toContain('Gross Monthly Salary: £3333.33');
    expect(resultItems[2]?.textContent).toContain('Net Annual Salary: £29000');
    expect(resultItems[3]?.textContent).toContain('Net Monthly Salary: £2416.67');
    expect(resultItems[4]?.textContent).toContain('Annual Tax Paid: £11000');
    expect(resultItems[5]?.textContent).toContain('Monthly Tax Paid: £916.67');
  });
});
