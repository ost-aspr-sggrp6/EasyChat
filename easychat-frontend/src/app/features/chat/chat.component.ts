import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {SocketService} from "@core/socket/socket.service";
import {SharedModule} from "@shared/shared.module";
import {CommonModule} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {StyleClassModule} from "primeng/styleclass";
import {CardModule} from "primeng/card";
import {MessageListComponent} from "@features/message-list/message-list.component";
import {MessageInputComponent} from "@features/message-input/message-input.component";
import {ChatMessage} from "@features/chat/chat.interface";

@Component({
  selector: 'easychat-chat',
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    BadgeModule,
    StyleClassModule,
    CardModule,
    MessageListComponent,
    MessageInputComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  message = '';
  messages: ChatMessage[] = [];

  private socketService = inject(SocketService);

  ngOnInit(): void {
    // Historie laden
    this.socketService.onHistory().subscribe((history: ChatMessage[]) => {
      this.messages = history;
    });

    // Eingehende Nachrichten vom Server abonnieren
    this.socketService.onMessage().subscribe((msg: ChatMessage) => {
      console.log('Received message:', msg.message);
      this.messages.push(msg);
    });
  }

  send(message: string): void {
    this.socketService.sendMessage(message);
    this.message = ''; // Eingabefeld leeren
  }
}
