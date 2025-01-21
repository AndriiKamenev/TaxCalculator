import { Component, Input } from '@angular/core';
import { CalculationResult } from '../../models/tax-calculator.model';


@Component({
  selector: 'app-tax-visualize',
  templateUrl: './tax-visualize.component.html',
  styleUrls: ['./tax-visualize.component.css'],
  standalone: false
})
export class TaxVisualizeComponent {
  @Input() calculationResult: CalculationResult | null = null; // Input property to receive data
}
