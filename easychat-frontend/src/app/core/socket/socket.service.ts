import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string): void {
    this.socket.emit('leaveRoom', roomId);
  }

  sendMessage(message: string): void {
    this.socket.emit('chatMessage', message);
  }

  onMessage(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('chatMessage', (msg: string) => {
        subscriber.next(msg);
      });
    });
  }
}
