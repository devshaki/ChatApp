import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { EventEmitter } from 'stream';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  EventEmitter.setMaxListeners(20);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
