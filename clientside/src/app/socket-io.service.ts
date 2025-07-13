import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { MessageDto } from './dto/message.dto';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket']
    });
  }

  onMessage(callback: (message: MessageDto) => void): void {
    this.socket.on('message', (message: MessageDto) => {
      callback(message);
    });
  }

  sendMessage(message: MessageDto): void {
    this.socket.emit('message', message);
  }
}
