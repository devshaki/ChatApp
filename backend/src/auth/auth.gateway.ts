import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Constants } from 'src/constants/constants';
import { CookiesService } from 'src/cookies/cookies.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly cookiesService: CookiesService) {}
  public clientUsernames: Map<Socket, string> = new Map();

  @WebSocketServer()
  server: Server;

  public getClientUsername(client: Socket): string | undefined {
    return this.clientUsernames.get(client);
  }

  @SubscribeMessage(Constants.GET_ONLINE_USERS_EVENT)
  public getOnlineUsers(client: Socket): void {
    for (const [socket, username] of this.clientUsernames.entries()) {
      if (socket !== client) {
        client.emit(Constants.USER_CONNECT_EVENT, username);
      }
    }
  }

  public handleConnection(client: Socket) {
    const username = this.cookiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return;
    }
    for (const [socket, user] of this.clientUsernames.entries()) {
      client.emit(Constants.USER_CONNECT_EVENT, user);
    }
    client.broadcast.emit(Constants.USER_CONNECT_EVENT, username);
    this.clientUsernames.set(client, username);
    console.log(`Client connected: ${client.id}`);
  }
  public handleDisconnect(client: Socket) {
    const username = this.clientUsernames.get(client);
    this.server.emit(Constants.USER_DISCONNECT_EVENT, username);
    this.clientUsernames.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  }
}
