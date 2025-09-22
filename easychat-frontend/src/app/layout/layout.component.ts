import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {SocketService} from "../core/socket/socket.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'easychat-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, ToolbarModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
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

  send(): void {
    if (this.message.trim()) {
      console.log('Sending message:', this.message);
      this.socketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
