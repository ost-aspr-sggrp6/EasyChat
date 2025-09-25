// src/app/navigation-items.ts
import { NavItem } from './nav-item.model';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'pi-home', label: 'Home', routerLink: '/' },
  { id: 'search', icon: 'pi-search', label: 'Suche', routerLink: '/search' },
  { id: 'settings', icon: 'pi-cog', label: 'Einstellungen', routerLink: '/settings', badge: 3 },
  { id: 'docs', icon: 'pi-book', label: 'Docs', href: 'https://angular.dev', target: '_blank' },
];
