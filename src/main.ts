import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfigInit } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
