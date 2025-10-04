import { Routes } from '@angular/router';
import {ChatComponent} from "@features/chat/chat.component";
import {authGuard} from "@core/auth/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/broadcast', pathMatch: 'full' },
  { path: 'broadcast', component: ChatComponent },
  { path: 'private', component: ChatComponent, canActivate: [authGuard]  },
  { path: 'chat/:id', component: ChatComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/broadcast' }
];
