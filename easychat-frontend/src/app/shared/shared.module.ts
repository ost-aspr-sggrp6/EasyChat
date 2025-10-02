// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
  ]
})
export class SharedModule {}
