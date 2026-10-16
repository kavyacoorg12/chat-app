import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
  app.enableCors({
    origin:configService.get<string>('frontend.frontend_url'),
    credentials:true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const port = configService.get<number>('PORT')??3234;
  await app.listen(port,'0.0.0.0');
}
await bootstrap();
