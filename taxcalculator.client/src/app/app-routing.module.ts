import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxCalculatorComponent } from './work/components/tax-calculator/tax-calculator.component';

const routes: Routes = [
  { path: '', component: TaxCalculatorComponent, pathMatch: 'full' },
  { path: 'calculate', component: TaxCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
