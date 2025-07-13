import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/dto/message.dto';
import { GroupDto } from 'src/dto/group.dto';
import { Request } from 'express';

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

    @Get('groups')
    async getAllGroups(@Req() request: Request): Promise<GroupDto[]> {
        const username = request.cookies?.["username"];
        if (!username) {
            throw new Error('Unauthorized: No username cookie found');
        }
        return await this.databaseService.getGroupsByUser(username);
    }

    @Post('group')
    async createGroup(@Body() body: { groupDto: GroupDto, username: string }): Promise<string> {
        return await this.databaseService.addGroup(body.groupDto, body.username);
    }
}
