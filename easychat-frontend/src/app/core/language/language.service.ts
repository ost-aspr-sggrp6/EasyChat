import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translateService = inject(TranslateService);
  private lang$ = new BehaviorSubject<string>('en');

  constructor() {
    //const savedLang = localStorage.getItem('lang') || 'en';
    const savedLang = 'en';
    this.use(savedLang);
  }

  use(lang: string) {
    this.translateService.use(lang);
    this.lang$.next(lang);
    localStorage.setItem('lang', lang);
  }

  get language$() {
    return this.lang$.asObservable();
  }
}
