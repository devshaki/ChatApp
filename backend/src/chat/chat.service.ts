import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message, MessageDocument } from 'src/schemas/message.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name)
        private messageModel : Model<MessageDocument>,
    ){}

    async addMessage(messageDto: MessageDto,username: string): Promise<string> {
        const message = new this.messageModel({
            body: messageDto.body,
            senderId: username,
            chatId: messageDto.chatId,
            createdAt: messageDto.createdAt || Date.now().toString()
        });
        await message.save();
        return message._id.toString();
    }
}
