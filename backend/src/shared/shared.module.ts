import { Global, Module } from '@nestjs/common';
import { AuthGateway } from 'src/auth/auth.gateway';
import { CookiesService } from 'src/cookies/cookies.service';

@Global()
@Module({
  providers: [AuthGateway, CookiesService],
  exports: [AuthGateway, CookiesService],
})
export class SharedModule {}
