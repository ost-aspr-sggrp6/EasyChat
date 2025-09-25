// src/app/types/nav-item.model.ts
export interface NavItem {
  /** Iconklasse ohne führendes 'pi ' — z.B. 'pi-home' */
  icon: string;
  /** Sichtbares Label */
  label: string;
  /** Externer/absoluter Link (optional, alternativ zu routerLink) */
  href?: string;
  /** Router-Link (optional, alternativ zu href) */
  routerLink?: string | any[]; // Angular Router erlaubt Segmente
  /** Target für externe Links, z.B. '_blank' */
  target?: '_self' | '_blank';
  /** Optionales aria-label; wenn nicht gesetzt, wird label genutzt */
  ariaLabel?: string;
  /** Optionales Badge (z.B. Zähler) */
  badge?: string | number;
  /** Stabile id für trackBy; falls leer, wird label verwendet */
  id?: string;
}
