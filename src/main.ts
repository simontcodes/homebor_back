import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4000', // Replace with your frontend URL
    credentials: true, // If you're using cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
