// apps/chat/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // Глобального пайпа здесь больше нет

  await app.listen(process.env.PORT ?? 5002);
}
bootstrap();
