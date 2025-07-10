import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() userDto: UserDto) {
        try {
            const clientId = await this.authService.login(userDto);
            return { clientId };
        }
        catch (error) {
            if (error.message === 'Invalid username or password') {
                throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @Post('signup')
    async signup(@Body() userDto: UserDto) {
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
