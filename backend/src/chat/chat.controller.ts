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
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';
import { Request } from 'express';
import { group } from 'console';
import { Constants } from 'src/constants/constants';

@Controller('chat')
export class ChatController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('contacts')
  public async getContacts(@Req() request: Request): Promise<string[]> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.getFriends(username);
  }

  @Get('groups')
  public async getAllGroups(@Req() request: Request): Promise<GroupDto[]> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.getGroupsByUser(username);
  }

  @Get(':groupId/messages')
  public async getChat(
    @Param('groupId') groupId: string,
  ): Promise<MessageDto[]> {
    return await this.databaseService.getMessagesByGroup(groupId);
  }

  @Get(':groupId/members')
  public async getMembersInGroup(
    @Param('groupId') groupId: string,
  ): Promise<string[]> {
    return await this.databaseService.getMembersInGroup(groupId);
  }

  @Post('group')
  public async createGroup(
    @Req() request,
    @Body() groupDto: GroupDto,
  ): Promise<string> {
    console.log('test');
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.addGroup(groupDto, username);
  }

  @Put('/remove/:groupId/:username')
  public async RemoveUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    return await this.databaseService.removeUserFromGroup(username, groupId);
  }

  @Put('/add/:groupId/:username')
  public async AddUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    return await this.databaseService.addUserToGroup(username, groupId);
  }

  @Put('/add-contact/:username')
  public async addContact(
    @Req() request: Request,
    @Param('username') username: string,
  ): Promise<void> {
    const currentUsername = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.addFriend(currentUsername, username);
  }

  @Get('usernames')
  public async getUsernames(): Promise<string[]> {
    return await this.databaseService.getUsernames();
  }

  @Get('dm/:friendname')
  public async getDmGroup(
    @Req() request,
    @Param('friendname') friendname: string,
  ): Promise<GroupDto | null> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.getDm(username, friendname);
  }

  @Get('group/:groupId')
  public async getGroup(@Param('groupId') groupId: string): Promise<GroupDto> {
    return await this.databaseService.getGroupById(groupId);
  }

  @Delete('dm/:contact')
  public async deleteDm(
    @Req() request: Request,
    @Param('contact') contact: string,
  ): Promise<void> {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    return await this.databaseService.deleteDm(username, contact);
  }
}

//    return this.http.delete<void>(`${this.apiUrl}/chat/dm/${contact}`, {
