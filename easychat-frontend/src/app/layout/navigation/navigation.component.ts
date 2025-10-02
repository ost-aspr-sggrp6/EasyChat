import { Component, Input } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import { RippleModule } from 'primeng/ripple';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NAV_ITEMS} from "./navigation-items";
import {NavItem} from "./nav-item.model";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Dialog} from 'primeng/dialog';
import {LanguageService} from "@core/language/language.service";
import {SharedModule} from "@shared/shared.module";
import {SelectModule} from "primeng/select";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'easychat-navigation',
  standalone: true,
  imports: [ButtonModule, RippleModule, StyleClassModule, NgClass, RouterLink, RouterLinkActive, NgForOf, NgIf, Dialog, SelectModule, SharedModule, TranslatePipe],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() collapsed = false;
  readonly items: NavItem[] = NAV_ITEMS;

  isDarkMode = false;

  visible = false;

  toggle() { this.collapsed = !this.collapsed; }

  languages = [
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Français', code: 'fr' }
  ];

  selectedLanguage = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.language$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  onLanguageChange(lang: string) {
    this.languageService.use(lang);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('easychat-dark-mode');
      this.isDarkMode = element.classList.contains('easychat-dark-mode');
    }
  }

  showDialog() {
    this.visible = true;
  }

  trackById = (_: number, item: NavItem) => item.id ?? item.label;

}
