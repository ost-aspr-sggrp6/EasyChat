import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideHttpClient,} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {EasychatPreset} from "../theme/easychat.preset";
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideKeycloak} from "keycloak-angular";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideKeycloak({
      config: {
        url: 'http://localhost:8080/',
        realm: 'easychat',
        clientId: 'easychat-frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      }
    }),
    provideAnimations(),
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
    }),
  ]
};
