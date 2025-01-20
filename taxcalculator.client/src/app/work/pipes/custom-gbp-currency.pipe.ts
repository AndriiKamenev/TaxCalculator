import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customGbpCurrency',
  standalone: false
})
export class CustomGbpCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) { }

  transform(value: number | null | undefined, currencyCode: string = 'GBP', display: string = 'symbol', digits: string = '1.0-2'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return ''; // Return an empty string if value is invalid
    }

    const formattedValue = this.currencyPipe.transform(value, currencyCode, display, digits);
    return formattedValue ? formattedValue.replace(/,/g, '') : '';
  }
}
