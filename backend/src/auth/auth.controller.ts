import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { Constants } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() userDto: UserDto) {
    try {
      const clientId = await this.authService.login(userDto);
      return { clientId };
    } catch (error) {
      if (error.message === 'Invalid username or password') {
        throw new HttpException(
          'Invalid username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  @Post('is-logged-in')
  public isLoggedIn(@Req() request): boolean {
    const username = request.cookies?.[Constants.USERNAME_COOKIE];
    console.log('isLoggedIn', username);
    if (!username) {
      return false;
    }
    const isValid = this.authService.isUserValid(username);
    return isValid;
  }

  @Post('signup')
  public async signup(@Body() userDto: UserDto) {
    try {
      const clientId = await this.authService.signup(userDto);
      return { clientId };
    } catch (error) {
      if (error.message === 'Username already exists') {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      }
    }
  }
}
