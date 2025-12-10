import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // elimina datos no definidos en el DTO
      forbidNonWhitelisted: true, // tira error si envían propiedades extra
      transform: true,            // convierte tipos (string → number, etc.)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
