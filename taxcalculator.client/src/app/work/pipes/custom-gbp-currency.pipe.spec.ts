import { TestBed } from '@angular/core/testing';
import { CustomGbpCurrencyPipe } from './custom-gbp-currency.pipe';
import { CurrencyPipe } from '@angular/common';

describe('CustomGbpCurrencyPipe', () => {
  let pipe: CustomGbpCurrencyPipe;
  let currencyPipe: CurrencyPipe;

  beforeEach(() => {
    // Set up the TestBed for the pipe and provide CurrencyPipe for dependency injection
    TestBed.configureTestingModule({
      providers: [CurrencyPipe]
    });

    // Inject the currencyPipe to pass it into the custom pipe constructor
    currencyPipe = TestBed.inject(CurrencyPipe);
    pipe = new CustomGbpCurrencyPipe(currencyPipe);
  });

  it('should transform valid number to GBP currency format', () => {
    const result = pipe.transform(1234.56);
    expect(result).toBe('£1234.56');  // Example result, assuming default settings
  });

  it('should return an empty string when value is null', () => {
    const result = pipe.transform(null);
    expect(result).toBe('');
  });

  it('should return an empty string when value is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should return an empty string when value is NaN', () => {
    const result = pipe.transform(NaN);
    expect(result).toBe('');
  });
});
