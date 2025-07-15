import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CookiesService } from 'src/cookies/cookies.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly cookiesService: CookiesService) {}
  public clientUsernames: Map<Socket, string> = new Map();

  @WebSocketServer()
  server: Server;

  getClientUsername(client: Socket): string | undefined {
    return this.clientUsernames.get(client);
  }
  handleConnection(client: Socket) {
    const username = this.cookiesService.findCookieInSocket(client, 'username');
    if (!username) {
      client.emit('error', 'Unauthorized user');
      return;
    }
    for (const [socket, user] of this.clientUsernames.entries()) {
      client.emit('userConnected', user);
    }
    client.broadcast.emit('userConnected', username);
    this.clientUsernames.set(client, username);
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    const username = this.clientUsernames.get(client);
    this.server.emit('userDisconnected', username);
    this.clientUsernames.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  }
}
