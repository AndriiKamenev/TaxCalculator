import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { APP_INITIALIZER } from '@angular/core';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
// Add a factory to initialize the `BASE_URL` at app startup
const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  // This will initialize `getBaseUrl()` during the app's bootstrap
  { provide: APP_INITIALIZER, useFactory: getBaseUrl, deps: [], multi: true,}
];

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
