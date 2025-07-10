import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from './chat.getaway';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CookiesService } from 'src/cookies/cookies.service';


@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema},
    ])
  ],
  controllers: [ChatController],
  providers: [ChatService,ChatGateway,CookiesService]
})
export class ChatModule {}
