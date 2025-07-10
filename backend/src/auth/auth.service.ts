import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}


    async login(userDto:UserDto): Promise<string> {
        const userId = await this.databaseService.checkUserLogin(userDto.username,userDto.password);
        return userId;
    }

    async signup(userDto:UserDto): Promise<string> {
        return this.databaseService.createUser(userDto);;

    }
}
