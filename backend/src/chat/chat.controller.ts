import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get(':groupId/messages')
    async getChat(@Param('groupId') groupId: string): Promise<MessageDto[]> {
        return await this.databaseService.getMessagesByGroup(groupId);
    }

    @Get(':groupId/members')
    async getMembersInGroup(@Param('groupId') groupId: string): Promise<string[]> {
        return await this.databaseService.getMembersInGroup(groupId);
    }

    @Get('user/:username/groups')
    async getAllGroups(@Param('username') username: string): Promise<GroupDto[]> {
        return await this.databaseService.getGroupsByUser(username);
    }

    @Post('group')
    async createGroup(@Body() groupDto: GroupDto, @Body() username: string): Promise<string> {
        return await this.databaseService.addGroup(groupDto, username);
    }
}
