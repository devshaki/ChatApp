import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [FriendsController],
})
export class FriendsModule {}
