import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from '../schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CookiesService } from 'src/cookies/cookies.service';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { AuthGateway } from 'src/auth/auth.gateway';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, CookiesService, AuthGateway],
})
export class ChatModule {}
