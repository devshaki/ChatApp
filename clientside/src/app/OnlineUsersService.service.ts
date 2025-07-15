import { Injectable } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineUsersService {
  private onlineUsers = new BehaviorSubject<string[]>([]);
  public onlineUsers$ = this.onlineUsers.asObservable();

  constructor(private socketService: SocketIoService) {
    this.initializeListeners();
  }

  private initializeListeners() {
    this.socketService.socket.on('userConnected', (username: string) => {
      const current = this.onlineUsers.value;
      if (!current.includes(username)) {
        this.onlineUsers.next([...current, username]);
      }
    });

    this.socketService.socket.on('userDisconnected', (username: string) => {
      const current = this.onlineUsers.value;
      this.onlineUsers.next(current.filter((user) => user !== username));
    });
  }

  isUserOnline(username: string): boolean {
    return this.onlineUsers.value.includes(username);
  }

  getOnlineUsers(): string[] {
    return this.onlineUsers.value;
  }
}
