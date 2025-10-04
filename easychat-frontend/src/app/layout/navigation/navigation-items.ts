import { NavItem } from './nav-item.model';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'pi-home',  label: 'SIDENAV.BROADCAST', routerLink: '/broadcast', match: 'exact'},
  { id: 'private', icon: 'pi-lock',  label: 'SIDENAV.PRIVATE', routerLink: '/private', match: 'exact', requiresAuth: true },
];
