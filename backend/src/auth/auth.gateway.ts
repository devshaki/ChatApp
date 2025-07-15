import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CookiesService } from 'src/cookies/cookies.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly cookiesService: CookiesService) {}
  public clientUsernames: Map<Socket, string> = new Map();

  getClientUsername(client: Socket): string | undefined {
    return this.clientUsernames.get(client);
  }
  handleConnection(client: Socket) {
    const username = this.cookiesService.findCookieInSocket(client, 'username');
    if (!username) {
      client.emit('error', 'Unauthorized user');
      return;
    }
    this.clientUsernames.set(client, username);
    console.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.clientUsernames.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  }
}
