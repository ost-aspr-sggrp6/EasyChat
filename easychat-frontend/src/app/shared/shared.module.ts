// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import {BadgeModule} from "primeng/badge";
import {StyleClassModule} from "primeng/styleclass";
import {CardModule} from "primeng/card";
import {RippleModule} from "primeng/ripple";
import {SelectModule} from "primeng/select";
import {Dialog} from "primeng/dialog";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    BadgeModule,
    StyleClassModule,
    CardModule,
    RippleModule,
    SelectModule,
    Dialog,
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    BadgeModule,
    StyleClassModule,
    CardModule,
    RippleModule,
    SelectModule,
    Dialog
  ]
})
export class SharedModule {}
