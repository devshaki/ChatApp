import { Controller, Get, Post, Req, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('friends')
export class FriendsController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get()
    async getFriends(@Req() request): Promise<string[]> {
        const username = request.cookies["username"];
        if (!username) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return this.databaseService.getFriends(username);
    }

    @Post('add/:friendname')
    async addFriend(@Req() request, @Param('friendname') friendname: string): Promise<void> {
        const username = request.cookies["username"];
        if (!username) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        await this.databaseService.addFriend(username, friendname);
    }

    @Post('remove/:friendname')
    async removeFriend(@Req() request, @Param('friendname') friendname: string) {
        const username = request.cookies["username"];
        if (!username) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        await this.databaseService.removeFriend(username, friendname);
    }
}
