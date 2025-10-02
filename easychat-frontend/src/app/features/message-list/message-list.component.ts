import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatMessage} from "@features/chat/chat.interface";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'easychat-message-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() messages: ChatMessage[] = [];
}
