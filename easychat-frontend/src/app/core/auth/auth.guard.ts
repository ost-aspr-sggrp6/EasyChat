import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import Keycloak from "keycloak-js";

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloak = inject(Keycloak);

  const isLoggedIn = keycloak.authenticated;
  if (!isLoggedIn) {
    await keycloak.login({redirectUri: window.location.href});
    return false;
  }

  return true;
};
