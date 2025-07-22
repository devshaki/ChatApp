import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/dto/message.dto';
import { ChatDatabaseService } from './chat-database.service';
import { OnlineUsersService } from 'src/auth/online-users.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatDatabaseService: ChatDatabaseService,
    private readonly onlineUsersService: OnlineUsersService,
  ) {}

  public async addMessage(
    messageDto: MessageDto,
    username: string,
  ): Promise<string> {
    const messageId = await this.chatDatabaseService.addMessage(
      messageDto,
      username,
    );

    await this.emitToChat(messageDto.chatId, 'message', messageDto);

    return messageId;
  }

  public async emitToChat(
    chatId: string,
    event: string,
    data: any,
  ): Promise<void> {
    const usersInChat =
      await this.chatDatabaseService.getMembersInGroup(chatId);
    await this.emitToUsers(usersInChat, event, data);
  }

  private async emitToUsers(
    usernames: string[],
    event: string,
    data: any,
  ): Promise<void> {
    for (const [
      socket,
      username,
    ] of this.onlineUsersService.clientUsernames.entries()) {
      if (usernames.includes(username)) {
        socket.emit(event, data);
      }
    }
  }
}
