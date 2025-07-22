import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGateway } from 'src/auth/auth.gateway';
import { OnlineUsersService } from 'src/auth/online-users.service';
import { CookiesService } from 'src/cookies/cookies.service';
import { ChatDatabaseService } from 'src/chat/chat-database.service';
import { DmService } from 'src/services/dm.service';
import { FriendService } from 'src/services/friend.service';
import { GroupService } from 'src/services/group.service';
import { MessageService } from 'src/services/message.service';
import { UserService } from 'src/services/user.service';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { HashingService } from 'src/hashing/hashing.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [
    AuthGateway,
    OnlineUsersService,
    CookiesService,
    ChatDatabaseService,
    GroupService,
    DmService,
    UserService,
    MessageService,
    FriendService,
    HashingService,
  ],
  exports: [
    AuthGateway,
    OnlineUsersService,
    CookiesService,
    ChatDatabaseService,
    GroupService,
    DmService,
    UserService,
    MessageService,
    FriendService,
    HashingService,
  ],
})
export class SharedModule {}
