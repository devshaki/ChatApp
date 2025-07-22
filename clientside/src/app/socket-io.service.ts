import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import io from 'socket.io-client';
import { MessageDto } from './dto/message.dto';
import { OnlineUsersService } from './OnlineUsersService.service';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  public socket: any;
  public message$ = new Subject<MessageDto>();
  public usersConnected: string[] = [];
  constructor() {
    console.log('Creating new socket connection');
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {});

    this.socket.on('message', (message: MessageDto) => {
      console.log(
        `Received message: ${message.body} ${message.chatId} ${message.senderId}`
      );
      this.message$.next(message);
    });
  }

  public getOnlineUsers() {
    this.socket.emit('getOnlineUsers');
  }

  public sendMessage(message: MessageDto): void {
    console.log(`Sending message: ${message.body}${message.chatId}`);
    this.socket.emit('message', message);
  }
  public kickMember(groupId: string, member: string): void {
    const payload = { groupId: groupId, username: member };
    console.log(`Kicking member: ${member} from group: ${groupId}`);
    this.socket.emit('kick', payload);
  }
  public addMember(groupId: string, member: string): void {
    const payload = { groupId: groupId, username: member };
    console.log(`Adding member: ${member} to group: ${groupId}`);
    this.socket.emit('add', payload);
  }
}
