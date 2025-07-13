import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthGateway } from './auth.gateway';
import { CookiesService } from 'src/cookies/cookies.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, AuthGateway, CookiesService],
  controllers: [AuthController],
  exports: [AuthService, AuthGateway]
})
export class AuthModule {}
