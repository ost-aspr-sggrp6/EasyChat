import {ApplicationConfig, importProvidersFrom, provideAppInitializer} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {EasychatPreset} from "../theme/easychat.preset";
import Keycloak from "keycloak-js";
import {from, mergeMap, Observable} from "rxjs";
import { provideAnimations } from '@angular/platform-browser/animations';


export const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'easychat',
  clientId: 'easychat-frontend',
});

// Init before app starts
async function initializeKeycloak() {
  await keycloak.init({
    pkceMethod: 'S256',
    onLoad: 'login-required',
  });
}

// Interceptor to attach token
export const keycloakInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return from(
    (async () => {
      if (!keycloak.authenticated) {
        await keycloak.login();
      }
      await keycloak.updateToken(10);
      return keycloak.token;
    })()
  ).pipe(
    mergeMap((token) => {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest); // returns Observable<HttpEvent>
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideAppInitializer(initializeKeycloak),
    // provideHttpClient(withInterceptors([keycloakInterceptor])),
    provideHttpClient(),
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
