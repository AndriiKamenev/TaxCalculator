import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { APP_INITIALIZER } from '@angular/core';

//  When Angular initializes the app, the BASE_URL is injected using the APP_INITIALIZER provider.
//  TaxService now receives the BASE_URL dynamically through dependency injection and passes it to AppConstant.GET_CALCULATE_TAX() to form the correct API URL.
//  This ensures that getBaseUrl() is accessed only after the app is fully initialized, thus preventing the "Cannot access 'TaxService' before initialization" error.
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
// Add a factory to initialize the `BASE_URL` at app startup
const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [], multi: false },
  // This will initialize `getBaseUrl()` during the app's bootstrap
  { provide: APP_INITIALIZER, useFactory: getBaseUrl, deps: [], multi: true}
];

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
