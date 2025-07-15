import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from 'src/dto/user.dto';
import { AuthGateway } from './auth.gateway';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authGateway: AuthGateway,
  ) {}

  async login(userDto: UserDto): Promise<string> {
    const userId = await this.databaseService.checkUserLogin(
      userDto.username,
      userDto.password,
    );
    return userId;
  }

  async signup(userDto: UserDto): Promise<string> {
    return this.databaseService.createUser(userDto);
  }
  async emitToUsers(usernames: string[], event: string, data: any) {
    for (const [
      socket,
      username,
    ] of this.authGateway.clientUsernames.entries()) {
      if (usernames.includes(username)) {
        socket.emit(event, data);
      }
    }
  }
}
