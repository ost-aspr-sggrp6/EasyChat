import { Injectable } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { keycloak } from '../../app.config'; // <-- WICHTIG: importieren!

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  // private kc = keycloak;
  //
  // getToken(): string | undefined {
  //   return this.kc.token ?? undefined;
  // }
  //
  // async loadUserProfile(): Promise<KeycloakProfile> {
  //   return this.kc.loadUserProfile();
  // }
  //
  // isLoggedIn(): boolean {
  //   return !!this.kc.authenticated;
  // }
  //
  // login() {
  //   return this.kc.login();
  // }
  //
  // logout(redirectUri = window.location.origin) {
  //   return this.kc.logout({ redirectUri });
  // }
}
