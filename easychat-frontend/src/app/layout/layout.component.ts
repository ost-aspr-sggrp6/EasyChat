import { Component } from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {NavigationComponent} from "./navigation/navigation.component";

@Component({
  selector: 'easychat-layout',
  standalone: true,
  imports: [SharedModule, NavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{ }
