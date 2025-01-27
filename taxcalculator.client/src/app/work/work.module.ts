import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './../angular-material.module';

import { TaxService } from './../work/services/tax-calculator.service';
import { TaxCalculatorComponent } from './../work/components/tax-calculator/tax-calculator.component';
import { TaxVisualizeComponent } from './../work/components/tax-visualize/tax-visualize.component';
import { CustomGbpCurrencyPipe } from './pipes/custom-gbp-currency.pipe';

@NgModule({
  declarations: [
    TaxCalculatorComponent,
    TaxVisualizeComponent,
    CustomGbpCurrencyPipe
  ],
  imports: [
    CommonModule,  // Import the CommonModule to use Angular's common directives like ngIf, ngFor
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [
    TaxService,
    CurrencyPipe
  ],
  exports: [
    CustomGbpCurrencyPipe
  ]
})
export class WorkModule { }

