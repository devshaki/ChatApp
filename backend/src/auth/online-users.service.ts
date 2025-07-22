import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Constants } from 'src/constants/constants';

@Injectable()
export class OnlineUsersService {
  public clientUsernames: Map<Socket, string> = new Map();
  constructor() {
    console.log('OnlineUsersService initialized');
  }
  public emitOnlineUsers(client: Socket): void {
    const onlineUsers = Array.from(this.clientUsernames.values());
    for (const username of onlineUsers) {
      client.emit(Constants.USER_CONNECT_EVENT, username);
    }
  }

  public getClientUsername(client: Socket): string | undefined {
    return this.clientUsernames.get(client);
  }

  public addClient(client: Socket, username: string): void {
    this.clientUsernames.set(client, username);
  }

  public removeClient(client: Socket): void {
    this.clientUsernames.delete(client);
  }

  public getOnlineUsernames(): string[] {
    return Array.from(this.clientUsernames.values());
  }
}
