import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  public async addMessage(messageDto: MessageDto): Promise<string> {
    const message = new this.messageModel({
      body: messageDto.body,
      senderId: messageDto.senderId,
      chatId: messageDto.chatId,
      createdAt: messageDto.createdAt || Date.now().toString(),
    });
    await message.save();
    return message._id.toString();
  }

  public async getMessagesByGroup(groupId: string): Promise<MessageDto[]> {
    const messages = await this.messageModel.find({ chatId: groupId });
    return messages.map((message) => ({
      body: message.body,
      senderId: message.senderId,
      chatId: message.chatId,
      createdAt: message.createdAt,
    }));
  }
}
