import {Component, inject, OnInit} from '@angular/core';
import {SocketService} from "@core/socket/socket.service";
import {SharedModule} from "@shared/shared.module";
import {MessageListComponent} from "@features/message-list/message-list.component";
import {MessageInputComponent} from "@features/message-input/message-input.component";
import {ChatMessage} from "@features/chat/chat.interface";

@Component({
  selector: 'easychat-chat',
  imports: [SharedModule, MessageListComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  private socketService = inject(SocketService);

  messages: ChatMessage[] = [];

  ngOnInit(): void {
    this.socketService.onHistory().subscribe((history: ChatMessage[]) => {
      this.messages = history;
    });

    this.socketService.onMessage().subscribe((msg: ChatMessage) => {
      this.messages.push(msg);
    });
  }

  send(message: string): void {
    this.socketService.sendMessage(message);
  }
}
