import {Component, OnInit} from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import {LanguageService} from "@core/language/language.service";
import {KeycloakService} from "@core/auth/keycloak.service";
import {KeycloakProfile} from "keycloak-js";
import {NgIf} from "@angular/common";


@Component({
  selector: 'easychat-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // observable der aktuellen Sprache
  lang$ = this.languageService.language$;

  userProfile?: KeycloakProfile;

  constructor(private languageService: LanguageService, private keycloakService: KeycloakService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.userProfile = await this.keycloakService.loadUserProfile();
    } catch (err) {
      console.error('Fehler beim Laden des Benutzerprofils', err);
    }
  }

  switchLanguage(lang: string) {
    this.languageService.use(lang);
  }
}
