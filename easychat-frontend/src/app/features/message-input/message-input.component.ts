import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from "@shared/shared.module";

@Component({
  selector: 'easychat-message-input',
  standalone: true,
  imports: [SharedModule],
  templateUrl: 'message-input.component.html',
  styleUrl: 'message-input.component.scss'
})
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
