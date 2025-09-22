import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { SocketService } from './services/socket.service';

@Component({
    selector: 'app-root',
    imports: [FormsModule, NgFor],
    template: `
    <h1>Chatify Frontend</h1>
    <input [(ngModel)]="message" placeholder="Nachricht schreiben..." />
    <button (click)="send()">Senden</button>

    <h3>Empfangene Nachrichten:</h3>
    <ul>
      <li *ngFor="let msg of messages">{{ msg }}</li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  message = '';
  messages: string[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Eingehende Nachrichten vom Server abonnieren
    this.socketService.onMessage().subscribe((msg: string) => {
      console.log('Received message:', msg);
      this.messages.push(msg);
    });
  }

  send(): void {
    if (this.message.trim()) {
      console.log('Sending message:', this.message);
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
