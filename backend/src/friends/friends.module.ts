import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
})
export class FriendsModule {}
