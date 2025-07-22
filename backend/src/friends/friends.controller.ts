import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Constants } from 'src/constants/constants';
import { FriendService } from 'src/services/friend.service';
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  public async getFriends(@Req() request): Promise<string[]> {
    const username = request.cookies['username'];
    if (!username) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.friendService.getFriends(username);
  }

  @Post('add/:friendname')
  public async addFriend(
    @Req() request,
    @Param('friendname') friendname: string,
  ): Promise<void> {
    const username = request.cookies['username'];
    if (!username) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.friendService.addFriend(username, friendname);
  }

  @Post('remove/:friendname')
  public async removeFriend(
    @Req() request,
    @Param('friendname') friendname: string,
  ) {
    const username = request.cookies[Constants.USERNAME_COOKIE];
    if (!username) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    await this.friendService.removeFriend(username, friendname);
  }
}
