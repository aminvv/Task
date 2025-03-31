import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigInit } from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  swaggerConfigInit(app)
  const PORT = process.env.PORT
  await app.listen(PORT ?? 3000, () => {
    console.log(
      `
       http://localhost:${PORT}
       swagger:http://localhost:${PORT}/swagger
      `);

  });
}
bootstrap();
