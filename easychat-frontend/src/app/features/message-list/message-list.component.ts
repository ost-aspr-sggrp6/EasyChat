import {Component, Input} from '@angular/core';
import {ChatMessage} from "@features/chat/chat.interface";
import {TranslatePipe} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";

@Component({
  selector: 'easychat-message-list',
  standalone: true,
  imports: [SharedModule, TranslatePipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  @Input() currentUserId!: string | undefined;
  @Input() messages: ChatMessage[] = [];


}
