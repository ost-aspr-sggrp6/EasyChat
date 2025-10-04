import {Component, inject, Input} from '@angular/core';
import {NAV_ITEMS} from "./navigation-items";
import {NavItem} from "./nav-item.model";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LanguageService} from "@core/language/language.service";
import {SharedModule} from "@shared/shared.module";
import {TranslatePipe} from "@ngx-translate/core";
import Keycloak from "keycloak-js";
import {HttpClient} from "@angular/common/http";
import {catchError, from, of, switchMap} from "rxjs";

@Component({
  selector: 'easychat-navigation',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private readonly languageService = inject(LanguageService);
  protected readonly keycloak = inject(Keycloak);
  protected readonly http = inject(HttpClient);

  @Input() collapsed = false;


  userProfile$ = of(this.keycloak.authenticated).pipe(
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return from(this.keycloak.loadUserProfile()).pipe(
          catchError(() => of(null))
        );
      }
      return of(null);
    })
  );
  readonly items: NavItem[] = NAV_ITEMS;
  readonly languages = [
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Français', code: 'fr' }
  ];

  selectedLanguage$ = this.languageService.language$;

  isDarkMode = false;
  visible = false;

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout(); // Redirect back to app after logout
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  changeLanguage(lang: string) {
    this.languageService.use(lang);
  }

  toggleTheme(): void {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('easychat-dark-mode');
      this.isDarkMode = element.classList.contains('easychat-dark-mode');
    }
  }

  showDialog(): void {
    this.visible = true;
  }

  protected() {
    const token = this.keycloak.token; // however you access your token

    this.http.get('http://localhost:3000/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'text'  // 👈 important
    }).subscribe({
      next: (res) => console.log('Protected response:', res),
      error: (err) => console.error('Access denied:', err)
    });
  }
}
