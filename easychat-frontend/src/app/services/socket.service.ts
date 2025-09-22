import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Mit deinem Backend verbinden
    this.socket = io('http://localhost:3000'); // URL vom Backend
  }

  // Nachricht senden
  sendMessage(message: string): void {
    console.log('Sending message:', message);
    this.socket.emit('chatMessage', message);
  }

  // Nachrichten empfangen
  onMessage(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('chatMessage', (msg: string) => {
        subscriber.next(msg);
      });
    });
  }
}
