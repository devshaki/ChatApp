import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Constants } from 'src/constants/constants';
import { CookiesService } from 'src/cookies/cookies.service';
import { OnlineUsersService } from './online-users.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly onlineUsersService: OnlineUsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Constants.GET_ONLINE_USERS_EVENT)
  public getOnlineUsers(client: Socket): void {
    this.onlineUsersService.emitOnlineUsers(client);
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
    this.onlineUsersService.emitOnlineUsers(client);
    client.broadcast.emit(Constants.USER_CONNECT_EVENT, username);
    this.onlineUsersService.clientUsernames.set(client, username);
  }
  public handleDisconnect(client: Socket) {
    const username = this.onlineUsersService.clientUsernames.get(client);
    this.server.emit(Constants.USER_DISCONNECT_EVENT, username);
    this.onlineUsersService.clientUsernames.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  }
}
