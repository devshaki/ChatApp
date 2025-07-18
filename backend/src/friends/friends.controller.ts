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
import { DatabaseService } from 'src/database/database.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  public async getFriends(@Req() request): Promise<string[]> {
    const username = request.cookies['username'];
    if (!username) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.databaseService.getFriends(username);
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
    await this.databaseService.addFriend(username, friendname);
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
    await this.databaseService.removeFriend(username, friendname);
  }
}
