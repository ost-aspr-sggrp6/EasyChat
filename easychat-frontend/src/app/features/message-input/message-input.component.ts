import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'easychat-message-input',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule],
  template: `
    <div class="message-input">
      <input
        type="text"
        pInputText
        [(ngModel)]="message"
        placeholder="Nachricht schreiben..."
        (keyup.enter)="sendMessage()"
        class="flex-1">
      <p-button
        label="Senden"
        (onClick)="sendMessage()"
        [disabled]="!message.trim()">
      </p-button>
    </div>
  `,
  styles: [`
    .message-input {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  `]})
export class MessageInputComponent {
  message = '';
  @Output() messageSent = new EventEmitter<string>();

  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSent.emit(this.message);
      this.message = '';
    }
  }
}
