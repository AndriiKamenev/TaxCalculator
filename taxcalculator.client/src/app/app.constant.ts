import { getBaseUrl } from '../main';

export class AppConstant {
  
  static ApiResource = class {

    static TaxCalculator = class {
      public static GET_CALCULATE_TAX(): string { return `${getBaseUrl()}api/tax/calculate`; };
    };
  };
};
