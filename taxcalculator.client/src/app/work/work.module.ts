import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';

import { TaxCalculatorComponent } from './../work/components/tax-calculator/tax-calculator.component';
import { CustomGbpCurrencyPipe } from './pipes/custom-gbp-currency.pipe';
import { TaxService } from './../work/services/tax-calculator.service';

@NgModule({
  declarations: [
    TaxCalculatorComponent,
    CustomGbpCurrencyPipe
  ],
  imports: [
    CommonModule,  // Import the CommonModule to use Angular's common directives like ngIf, ngFor
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [
    TaxService,
    CurrencyPipe 
  ],
  exports: [
    TaxCalculatorComponent,
    CustomGbpCurrencyPipe
  ]
})
export class WorkModule { }

