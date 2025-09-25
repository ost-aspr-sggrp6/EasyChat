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
  messages: string[] = [];

  private socketService = inject(SocketService);

  ngOnInit(): void {
    // Eingehende Nachrichten vom Server abonnieren
    this.socketService.onMessage().subscribe((msg: string) => {
      console.log('Received message:', msg);
      this.messages.push(msg);
    });
  }

  send(message: string): void {
    console.log('Sending message:', message);
    this.socketService.sendMessage(message);
  }
}
