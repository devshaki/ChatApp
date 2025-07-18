import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageDto } from 'src/dto/message.dto';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { CookiesService } from 'src/cookies/cookies.service';
import { AuthGateway } from 'src/auth/auth.gateway';
import { DatabaseService } from 'src/database/database.service';
import { Constants } from 'src/constants/constants';

@WebSocketGateway()
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly cockiesService: CookiesService,
    private readonly authGateway: AuthGateway,
    private readonly databaseService: DatabaseService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(Constants.MESSAGE_EVENT)
  public handleMessage(client: Socket, payload: MessageDto): string {
    const username = this.cockiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }
    payload.senderId = username;
    payload.createdAt = new Date();
    console.log(
      `Received message from ${username}: ${payload.body} in chat ${payload.senderId}`,
    );
    this.chatService.emitToChat(
      payload.chatId,
      Constants.MESSAGE_EVENT,
      payload,
    );
    this.chatService.addMessage(payload, username);
    console.log(`Message from ${username}: ${payload.body}`);
    return Constants.RECEIVED_MESSAGE;
  }

  @SubscribeMessage(Constants.ADD_EVENT)
  public handleJoin(
    client: Socket,
    payload: { groupId: string; username: string },
  ): string {
    const username = this.cockiesService.findCookieInSocket(
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
    this.chatService.addMessage(joinMessage, Constants.CONSOLE_MESSAGES_USER);
    this.databaseService.addUserToGroup(payload.username, payload.groupId);
    return Constants.USER_JOIN_CHAT;
  }

  @SubscribeMessage(Constants.LEAVE_EVENT)
  public handleLeave(client: Socket, groupId: string): string {
    const username = this.cockiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }
    const leaveMessage: MessageDto = {
      body: this.authGateway.getClientUsername(client) + ' has left the chat',
      chatId: groupId,
      senderId: Constants.CONSOLE_MESSAGES_USER,
    };
    this.chatService.emitToChat(groupId, Constants.MESSAGE_EVENT, leaveMessage);
    this.chatService.addMessage(leaveMessage, username);
    this.databaseService.removeUserFromGroup(username, groupId);
    return Constants.USER_LEAVE_CHAT;
  }

  @SubscribeMessage(Constants.KICK_EVENT)
  public handleKick(
    client: Socket,
    payload: { groupId: string; username: string },
  ): string {
    const adminUsername = this.cockiesService.findCookieInSocket(
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
    this.chatService.addMessage(kickMessage, Constants.CONSOLE_MESSAGES_USER);
    this.databaseService.removeUserFromGroup(payload.username, payload.groupId);
    return payload.username + Constants.USER_KICKED;
  }
}
