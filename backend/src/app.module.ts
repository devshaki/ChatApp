import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HashingService } from './hashing/hashing.service';
import { ChatModule } from './chat/chat.module';
import { FriendsModule } from './friends/friends.module';
import { CookiesService } from './cookies/cookies.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chatapp'),
    AuthModule,
    DatabaseModule,
    ChatModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService, HashingService, CookiesService],
})
export class AppModule {}
