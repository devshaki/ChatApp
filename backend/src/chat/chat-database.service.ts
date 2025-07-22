import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class ChatDatabaseService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  public async addMessage(
    messageDto: MessageDto,
    username: string,
  ): Promise<string> {
    const message = new this.messageModel({
      body: messageDto.body,
      senderId: username,
      chatId: messageDto.chatId,
      createdAt: messageDto.createdAt || Date.now().toString(),
    });
    await message.save();
    return message._id.toString();
  }

  public async getMembersInGroup(groupId: string): Promise<string[]> {
    const usersInGroup = await this.userModel.find({ chats: groupId });
    const usernames = usersInGroup.map((user) => user.username);
    return usernames;
  }
}
