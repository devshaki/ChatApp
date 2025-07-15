import { Controller, Get, Param, Post, Body, Req, Put } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';
import { Request } from 'express';
import { group } from 'console';

@Controller('chat')
export class ChatController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('contacts')
  async getContacts(@Req() request: Request): Promise<string[]> {
    const username = request.cookies?.['username'];
    if (!username) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.getFriends(username);
  }

  @Get('groups')
  async getAllGroups(@Req() request: Request): Promise<GroupDto[]> {
    const username = request.cookies?.['username'];
    if (!username) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.getGroupsByUser(username);
  }

  @Get(':groupId/messages')
  async getChat(@Param('groupId') groupId: string): Promise<MessageDto[]> {
    return await this.databaseService.getMessagesByGroup(groupId);
  }

  @Get(':groupId/members')
  async getMembersInGroup(
    @Param('groupId') groupId: string,
  ): Promise<string[]> {
    return await this.databaseService.getMembersInGroup(groupId);
  }

  @Post('group')
  async createGroup(
    @Req() request,
    @Body() groupDto: GroupDto,
  ): Promise<string> {
    console.log('test');
    const username = request.cookies?.['username'];
    if (!username) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.addGroup(groupDto, username);
  }

  @Put('/remove/:groupId/:username')
  async RemoveUserFromGroup(
    @Req() request,
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    const currentUsername = request.cookies?.['username'];
    if (!currentUsername) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.removeUserFromGroup(username, groupId);
  }

  @Put('/add/:groupId/:username')
  async AddUserFromGroup(
    @Req() request,
    @Param('groupId') groupId: string,
    @Param('username') username: string,
  ): Promise<void> {
    const currentUsername = request.cookies?.['username'];
    if (!currentUsername) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.addUserToGroup(username, groupId);
  }

  @Put('/add-contact/:username')
  async addContact(
    @Req() request: Request,
    @Param('username') username: string,
  ): Promise<void> {
    const currentUsername = request.cookies?.['username'];
    if (!currentUsername) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.addFriend(currentUsername, username);
  }

  @Get('usernames')
  async getUsernames(): Promise<string[]> {
    return await this.databaseService.getUsernames();
  }

  @Get('dm/:friendname')
  async getDmGroup(
    @Req() request,
    @Param('friendname') friendname: string,
  ): Promise<GroupDto | null> {
    const username = request.cookies?.['username'];
    if (!username) {
      throw new Error('Unauthorized: No username cookie found');
    }
    return await this.databaseService.getDm(username, friendname);
  }
}
