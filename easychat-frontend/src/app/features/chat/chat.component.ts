import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "@core/socket/socket.service";
import {SharedModule} from "@shared/shared.module";
import {MessageListComponent} from "@features/message-list/message-list.component";
import {MessageInputComponent} from "@features/message-input/message-input.component";
import {ChatMessage} from "@features/chat/chat.interface";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import Keycloak from "keycloak-js";

@Component({
  selector: 'easychat-chat',
  imports: [SharedModule, MessageListComponent, MessageInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  private socketService = inject(SocketService);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();
  private keycloak = inject(Keycloak);

  messages: ChatMessage[] = [];
  chatType: 'broadcast' | 'private' | 'dm' = 'broadcast';
  targetId: string | null = null;
  currentUserId: string | undefined;
  currentUsername: string | undefined;

  async ngOnInit(): Promise<void> {
    // ✅ Load user profile first if authenticated
    if (this.keycloak.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      this.currentUserId = profile?.id;
      this.currentUsername = profile?.username;
    }

    // ✅ Now safe to handle routing and socket setup
    this.route.url
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.resolveChatType();
        this.loadHistory();
      });

    this.socketService.onHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((history) => {
        console.log('Received history:', history);
        this.messages = history;
      });

    this.socketService.onMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe((msg) => this.messages.push(msg));
  }

  private resolveChatType() {
    const path = this.route.snapshot.routeConfig?.path;

    if (path === 'broadcast') {
      this.chatType = 'broadcast';
      this.targetId = null;
    } else if (!this.currentUserId) {
      console.warn('User must be authenticated for this chat');
      return; // oder: this.router.navigate(['/login'])
    } else if (path === 'private') {
      this.chatType = 'private';
      this.targetId = null;
    } else if (path === 'chat/:id') {
      this.chatType = 'dm';
      this.targetId = this.route.snapshot.paramMap.get('id');
    }

    // ✅ Replace userId with full user object
    this.socketService.setChatContext(
      this.chatType,
      this.targetId,
      this.currentUserId ? {
        id: this.currentUserId,
        username: this.currentUsername ?? 'anonymous'
      } : undefined
    );
  }

  private loadHistory() {
    this.messages = []; // reset
    this.socketService.requestHistory(this.chatType, this.targetId);
  }

  send(message: string): void {
    this.socketService.sendMessage(
      message
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.socketService.leaveChat();
  }
}
