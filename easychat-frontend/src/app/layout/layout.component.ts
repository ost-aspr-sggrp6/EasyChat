import { Component } from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {CommonModule} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {StyleClassModule} from "primeng/styleclass";
import {NavigationComponent} from "./navigation/navigation.component";
import {CardModule} from "primeng/card";

@Component({
  selector: 'easychat-layout',
  standalone: true,
  imports: [SharedModule, CommonModule, BadgeModule, StyleClassModule, NavigationComponent, CardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{ }
