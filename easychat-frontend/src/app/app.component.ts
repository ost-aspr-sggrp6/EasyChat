import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';
import {LanguageService} from "@core/language/language.service";
import Lara from "@primeuix/themes/lara";


@Component({
  selector: 'easychat-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  // observable der aktuellen Sprache
  lang$ = this.languageService.language$;

  constructor(private languageService: LanguageService) {}

  switchLanguage(lang: string) {
    this.languageService.use(lang);
  }
}
