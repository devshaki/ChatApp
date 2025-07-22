import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FriendsModule } from './friends/friends.module';
import { SharedModule } from './shared/shared.module';
import { ChatDatabaseService } from './chat/chat-database.service';
import { OnlineUsersService } from './auth/online-users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chatapp'),
    SharedModule,
    AuthModule,
    ChatModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService, OnlineUsersService],
})
export class AppModule {}
