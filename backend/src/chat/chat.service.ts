import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthGateway } from 'src/auth/auth.gateway';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly authGateway: AuthGateway,
  ) {}

  async addMessage(messageDto: MessageDto, username: string): Promise<string> {
    const message = new this.messageModel({
      body: messageDto.body,
      senderId: username,
      chatId: messageDto.chatId,
      createdAt: messageDto.createdAt || Date.now().toString(),
    });
    await message.save();
    return message._id.toString();
  }

  async emitToChat(
    chatId: string,
    event: string,
    message: MessageDto,
  ): Promise<void> {
    const usersInChat = await this.getMembersInGroup(chatId);
    await this.emitToUsers(usersInChat, event, message);
  }

  async getMembersInGroup(groupId: string): Promise<string[]> {
    const usersInGroup = await this.userModel.find({ contacts: groupId });
    const usernames = usersInGroup.map((user) => user.username);
    return usernames;
  }
  async emitToUsers(usernames: string[], event: string, data: any) {
    for (const [
      socket,
      username,
    ] of this.authGateway.clientUsernames.entries()) {
      if (usernames.includes(username)) {
        console.log(`Emitting to ${username} on event ${event}`);
        socket.emit(event, data);
      }
    }
  }
}
