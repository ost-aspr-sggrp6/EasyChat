import { Component, Input } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import { RippleModule } from 'primeng/ripple';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NAV_ITEMS} from "./navigation-items";
import {NavItem} from "./nav-item.model";
import {RouterLink, RouterLinkActive} from "@angular/router";      // für Click-Effekt
import {Dialog} from 'primeng/dialog';
import {InputText} from "primeng/inputtext";

@Component({
  selector: 'easychat-navigation',
  standalone: true,
  imports: [ButtonModule, RippleModule, StyleClassModule, NgClass, RouterLink, RouterLinkActive, NgForOf, NgIf, Dialog, InputText],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() collapsed = false;
  readonly items: NavItem[] = NAV_ITEMS;

  isDarkMode = false;

  visible = false;

  profileLinks = [
    { label: 'Profile', icon: 'pi-user', routerLink: '/profile' },
    { label: 'Settings', icon: 'pi-cog', routerLink: '/settings' },
    { label: 'Sign Out', icon: 'pi-sign-out', href: '/logout' }
  ];

  user = {
    name: 'Amy Elsner',
    avatarUrl: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/avatar-amyels.png'
  };

  toggle() { this.collapsed = !this.collapsed; }


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
