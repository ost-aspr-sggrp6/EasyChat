import {Injectable, OnDestroy} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import {ChatMessage} from "@features/chat/chat.interface";

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  sendMessage(message: string): void {
    this.socket.emit('chatMessage', message);
  }

  onMessage(): Observable<ChatMessage> {
    return new Observable((subscriber) => {
      this.socket.on('chatMessage', (msg: ChatMessage) => {
        subscriber.next(msg);
      });
    });
  }

  onHistory(): Observable<ChatMessage[]> {
    return new Observable((subscriber) => {
      this.socket.on('chatHistory', (history: ChatMessage[]) => {
        subscriber.next(history);
      });
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
