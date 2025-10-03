import {Component, inject, Input} from '@angular/core';
import {NAV_ITEMS} from "./navigation-items";
import {NavItem} from "./nav-item.model";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LanguageService} from "@core/language/language.service";
import {SharedModule} from "@shared/shared.module";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'easychat-navigation',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private readonly languageService = inject(LanguageService);

  @Input() collapsed = false;

  readonly items: NavItem[] = NAV_ITEMS;
  readonly languages = [
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Français', code: 'fr' }
  ];

  selectedLanguage$ = this.languageService.language$;

  isDarkMode = false;
  visible = false;

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

  trackById = (_: number, item: NavItem) => item.id ?? item.label;
}
