import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
// import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { SharedModule } from 'src/shared/shared.module';
import { MessageGateway } from './message.gateway';
import { GroupEventsGateway } from './group-events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
    SharedModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, MessageGateway, GroupEventsGateway],
  exports: [ChatService],
})
export class ChatModule {}
