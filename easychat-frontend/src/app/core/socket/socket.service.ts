import {Injectable, OnDestroy} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {Observable, Subject} from 'rxjs';
import { environment } from '@environment/environment';
import {ChatMessage} from "@features/chat/chat.interface";

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;
  private currentContext: {
    type: 'broadcast' | 'private' | 'dm';
    targetId: string | null;
    user?: { id: string; username: string };
  } = {
    type: 'broadcast',
    targetId: null,
  };

  private destroy$ = new Subject<void>();

  constructor() {
    this.socket = io(environment.socketUrl);

    // Optional: Connect log
    this.socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.disconnect();
  }

// ✅ Set chat room context including user identity
  setChatContext(
    chatType: "broadcast" | "private" | "dm",
    targetId: string | null,
    user?: { id: string; username: string }
  ) {
    // Leave old room if exists
    this.socket.emit('leaveRoom', this.currentContext);

    // ✅ Update full context
    this.currentContext = {
      type: chatType,
      targetId,
      user
    };

    // Join new room
    this.socket.emit('joinRoom', this.currentContext);
  }


  // ✅ Send message with context
  sendMessage(message: string): void {
    console.log(this.currentContext);

    this.socket.emit('chatMessage', {
      message,
      ...this.currentContext
    });
  }

  // ✅ Request history for current room
  requestHistory(chatType: "broadcast" | "private" | "dm", targetId: string | null) {
    this.socket.emit('requestHistory', { type: chatType, targetId });
  }

  // ✅ Listen for individual messages
  onMessage(): Observable<ChatMessage> {
    return new Observable((subscriber) => {
      this.socket.on('chatMessage', (msg: ChatMessage) => {
        subscriber.next(msg);
      });
    });
  }

  // ✅ Listen for full history
  onHistory(): Observable<ChatMessage[]> {
    return new Observable((subscriber) => {
      this.socket.on('chatHistory', (history: ChatMessage[]) => {
        subscriber.next(history);
      });
    });
  }

  // ✅ Optional: leave chat
  leaveChat() {
    this.socket.emit('leaveRoom', this.currentContext);
  }
}
