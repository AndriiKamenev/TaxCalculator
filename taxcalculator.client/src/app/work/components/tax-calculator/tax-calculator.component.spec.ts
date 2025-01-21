import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../../../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { of } from 'rxjs';  // for mocking observable
import { TaxCalculatorComponent } from './tax-calculator.component';
import { TaxService } from '../../services/tax-calculator.service';  // Import TaxService
import { SalaryInput, CalculationResult } from './../../models/tax-calculator.model'; // Import the interfaces

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;

  beforeEach(async () => {
    console.log('Initializing TaxService...');
    // Create a mock TaxService object with a mock 'calculateTax' method
    let taxService = jasmine.createSpyObj<TaxService>('TaxService',
      ['calculateTax']);
    // Configure the 'calculateTax' spy method
    taxService.calculateTax.and.returnValue(
      of<CalculationResult>({
        grossAnnualSalary: 50000,
        grossMonthlySalary: 4166.67,
        netAnnualSalary: 40000,
        netMonthlySalary: 3333.33,
        annualTaxPaid: 1000,
        monthlyTaxPaid: 83.33
      })
    );


    await TestBed.configureTestingModule({
      declarations: [TaxCalculatorComponent],
      imports: [
        BrowserAnimationsModule, // Needed for Angular Material components
        ReactiveFormsModule,     // Import ReactiveFormsModule for formGroup
        AngularMaterialModule,   // Import the module containing Material components
      ],
      providers: [
        { provide: TaxService, useValue: taxService }  // Provide the mock version of TaxService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    console.log('TaxService initialized:', component);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //it('should call calculateTax and get the result', () => {
  //  const taxService = TestBed.inject(TaxService);  // Get the instance of the mocked TaxService
  //  spyOn(taxService, 'calculateTax').and.callThrough(); // Spy on the method

  //  // Set form values and call the method
  //  component.taxForm.setValue({ grossAnnualSalary: 50000 });
  //  component.calculateTax();

  //  // Check if the calculateTax method was called
  //  expect(taxService.calculateTax).toHaveBeenCalled(); 

  //  // Verify the result
  //  expect(component.calculationResult).toEqual({
  //    grossAnnualSalary: 50000,
  //    grossMonthlySalary: 4166.67,
  //    netAnnualSalary: 40000,
  //    netMonthlySalary: 3333.33,
  //    annualTaxPaid: 1000,
  //    monthlyTaxPaid: 83.33
  //  });
  //});
});
