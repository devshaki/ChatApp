import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from 'src/dto/message.dto';

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

    @Post(':groupId/message')
    async addMessage(@Param('groupId') groupId: string, @Body() messageDto: MessageDto): Promise<string> {
        messageDto.chatId = groupId; 
        return await this.databaseService.addMessage(messageDto);
    }

    @Post(':groupId/member/:username')
    async addMemberToGroup(@Param('groupId') groupId: string, @Param('username') username: string): Promise<void> {
        await this.databaseService.addUserToGroup(groupId, username);
    }
}
