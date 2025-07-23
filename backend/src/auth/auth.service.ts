import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthGateway } from './auth.gateway';
import { UserService } from 'src/services/user.service';
import { OnlineUsersService } from './online-users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authGateway: AuthGateway,
    private readonly onlineUsersService: OnlineUsersService,
  ) {}

  public async login(userDto: UserDto): Promise<string> {
    const userId = await this.userService.checkUserLogin(
      userDto.username,
      userDto.password,
    );
    return userId;
  }

  public async isUserValid(username: string): Promise<boolean> {
    return await this.userService.isUserValid(username);
  }

  public async signup(userDto: UserDto): Promise<string> {
    return this.userService.createUser(userDto);
  }
  public async emitToUsers(usernames: string[], event: string, data: any) {
    for (const [
      socket,
      username,
    ] of this.onlineUsersService.clientUsernames.entries()) {
      if (usernames.includes(username)) {
        socket.emit(event, data);
      }
    }
  }
}
