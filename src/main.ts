/*
=============================================================
; Title:  nodebucket
; Author: Professor Krasso
; Modified By: Nicole Forke
; Date:   05 October 2020
; Description: Main
;============================================================
*/

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
