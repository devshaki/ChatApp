import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import io from 'socket.io-client';
import { MessageDto } from './dto/message.dto';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  private socket: any;
  public message$ = new Subject<MessageDto>();

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });
    this.socket.on('message', (message: MessageDto) => {
      console.log(
        `Received message: ${message.body} ${message.chatId} ${message.senderId}`
      );
      this.message$.next(message);
    });
  }

  sendMessage(message: MessageDto): void {
    console.log(`Sending message: ${message.body}${message.chatId}`);
    this.socket.emit('message', message);
  }
}
