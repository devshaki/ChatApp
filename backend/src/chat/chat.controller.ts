import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';
import { Request } from 'express';
import { Constants } from 'src/constants/constants';
import { FriendService } from 'src/services/friend.service';
import { UserService } from 'src/services/user.service';
import { GroupService } from 'src/services/group.service';
import { MessageService } from 'src/services/message.service';
import { DmService } from 'src/services/dm.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly messages: MessageService,
    private readonly dmService: DmService,
  ) {}

  @Get('contacts')
  public async getContacts(@Req() request: Request): Promise<string[]> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.friendService.getFriends(username);
  }

  @Get('groups')
  public async getAllGroups(@Req() request: Request): Promise<GroupDto[]> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.groupService.getGroupsByUser(username);
  }

  @Get(':groupId/messages')
  public async getChat(
    @Param('groupId') groupId: string,
  ): Promise<MessageDto[]> {
    return await this.messages.getMessagesByGroup(groupId);
  }

  @Get(':groupId/members')
  public async getMembersInGroup(
    @Param('groupId') groupId: string,
  ): Promise<string[]> {
    return await this.groupService.getMembersInGroup(groupId);
  }

  @Post('group')
  public async createGroup(
    @Req() request,
    @Body() groupDto: GroupDto,
  ): Promise<string> {
    console.log('test');
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.groupService.addGroup(groupDto, username);
  }

  @Put('/remove/:groupId/:username')
  public async RemoveUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    return await this.groupService.removeUserFromGroup(username, groupId);
  }

  @Put('/add/:groupId/:username')
  public async AddUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    return await this.groupService.addUserToGroup(username, groupId);
  }

  @Put('/add-contact/:username')
  public async addContact(
    @Req() request: Request,
    @Param('username') username: string,
  ): Promise<void> {
    const currentUsername = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.friendService.addFriend(currentUsername, username);
  }

  @Get('usernames')
  public async getUsernames(@Req() request): Promise<string[]> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.userService.getUsernames(username);
  }

  @Get('dm/:friendname')
  public async getDmGroup(
    @Req() request,
    @Param('friendname') friendname: string,
  ): Promise<GroupDto | null> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.dmService.getDm(username, friendname);
  }

  @Get('group/:groupId')
  public async getGroup(@Param('groupId') groupId: string): Promise<GroupDto> {
    return await this.groupService.getGroupById(groupId);
  }

  @Delete('dm/:contact')
  public async deleteDm(
    @Req() request: Request,
    @Param('contact') contact: string,
  ): Promise<void> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.dmService.deleteDm(username, contact);
  }
}
