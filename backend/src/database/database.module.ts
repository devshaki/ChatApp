import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { User, UserSchema } from '../schemas/user.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import {Group, GroupSchema} from '../schemas/group.schema';
import { HashingService } from 'src/hashing/hashing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema},
      { name: Group.name, schema: GroupSchema },
    ]),
  ],
  providers: [DatabaseService,HashingService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
