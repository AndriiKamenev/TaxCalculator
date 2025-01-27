import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Load all the spec files
// @ts-ignore
//const context = (require as any).context('./', true, /\.spec\.ts$/);
//const context = require.context('./', true, /\.spec\.ts$/);
//context.keys().map(context);
