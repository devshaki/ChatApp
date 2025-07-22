import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Constants } from 'src/constants/constants';
import { CookiesService } from 'src/cookies/cookies.service';
import { MessageDto } from 'src/dto/message.dto';
import { ChatService } from './chat.service';
import { GroupService } from 'src/services/group.service';
import { AuthGateway } from 'src/auth/auth.gateway';
import { ChatDatabaseService } from './chat-database.service';
import { OnlineUsersService } from 'src/auth/online-users.service';

@WebSocketGateway()
export class GroupEventsGateway {
  constructor(
    private readonly cookiesService: CookiesService,
    private readonly chatService: ChatService,
    private readonly groupService: GroupService,
    private readonly authGateway: AuthGateway,
    private readonly chatDatabaseService: ChatDatabaseService,
    private readonly onlineUsersService: OnlineUsersService,
  ) {}

  @SubscribeMessage(Constants.ADD_EVENT)
  public handleJoin(
    client: Socket,
    payload: { groupId: string; username: string },
  ): string {
    const username = this.cookiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }
    const joinMessage: MessageDto = {
      body: payload.username + ' has joined the chat',
      chatId: payload.groupId,
      senderId: Constants.CONSOLE_MESSAGES_USER,
    };
    this.chatService.emitToChat(
      payload.groupId,
      Constants.MESSAGE_EVENT,
      joinMessage,
    );
    this.chatDatabaseService.addMessage(
      joinMessage,
      Constants.CONSOLE_MESSAGES_USER,
    );
    this.groupService.addUserToGroup(payload.username, payload.groupId);
    return Constants.USER_JOIN_CHAT;
  }

  @SubscribeMessage(Constants.LEAVE_EVENT)
  public handleLeave(client: Socket, groupId: string): string {
    const username = this.cookiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }
    const leaveMessage: MessageDto = {
      body:
        this.onlineUsersService.getClientUsername(client) +
        ' has left the chat',
      chatId: groupId,
      senderId: Constants.CONSOLE_MESSAGES_USER,
    };
    this.chatService.emitToChat(groupId, Constants.MESSAGE_EVENT, leaveMessage);
    this.chatDatabaseService.addMessage(leaveMessage, username);
    this.groupService.removeUserFromGroup(username, groupId);
    return Constants.USER_LEAVE_CHAT;
  }

  @SubscribeMessage(Constants.KICK_EVENT)
  public handleKick(
    client: Socket,
    payload: { groupId: string; username: string },
  ): string {
    const adminUsername = this.cookiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!adminUsername) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }
    const kickMessage: MessageDto = {
      body: `${adminUsername} has kicked ${payload.username} from the chat`,
      chatId: payload.groupId,
      senderId: Constants.CONSOLE_MESSAGES_USER,
    };
    this.chatService.emitToChat(
      payload.groupId,
      Constants.MESSAGE_EVENT,
      kickMessage,
    );
    this.chatDatabaseService.addMessage(
      kickMessage,
      Constants.CONSOLE_MESSAGES_USER,
    );
    this.groupService.removeUserFromGroup(payload.username, payload.groupId);
    return payload.username + Constants.USER_KICKED;
  }
}
