import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {EasychatPreset} from "../theme/easychat.preset";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: EasychatPreset,
        options: {
          darkModeSelector: '.easychat-dark-mode'
        }
      }
    }),
    importProvidersFrom(
      TranslateModule.forRoot()
    ),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json'
    })
  ]
};
