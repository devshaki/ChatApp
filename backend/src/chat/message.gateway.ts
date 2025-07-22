import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Constants } from 'src/constants/constants';
import { CookiesService } from 'src/cookies/cookies.service';
import { MessageDto } from 'src/dto/message.dto';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly cookiesService: CookiesService,
  ) {}

  @SubscribeMessage('message')
  public async handleMessage(
    client: Socket,
    payload: MessageDto,
  ): Promise<string> {
    const username = this.cookiesService.findCookieInSocket(
      client,
      Constants.USERNAME_COOKIE,
    );
    if (!username) {
      client.emit(Constants.ERROR_EVENT, Constants.UNAUTHORIZED_USER_MESSAGE);
      return Constants.UNAUTHORIZED_USER_MESSAGE;
    }

    payload.senderId = username;
    payload.createdAt = new Date();

    await this.chatService.addMessage(payload, username);
    console.log('Saving message:', payload);

    return Constants.RECEIVED_MESSAGE;
  }
}
