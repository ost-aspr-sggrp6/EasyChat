import { NavItem } from './nav-item.model';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: 'pi-home',  label: 'SIDENAV.BROADCAST', routerLink: '/' },
  { id: 'private', icon: 'pi-home',  label: 'SIDENAV.PRIVATE', routerLink: '/private' },
  { id: 'chat', icon: 'pi-home',  label: 'SIDENAV.PRIVATE', routerLink: '/chat' }
];
