import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'easychat-message-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="message-list">
      <h3>Empfangene Nachrichten:</h3>
      <ul>
        @for (msg of messages; track msg) {
          <li>{{ msg }}</li>
        }
      </ul>
    </div>
  `
})
export class MessageListComponent {
  @Input() messages: string[] = [];
}
