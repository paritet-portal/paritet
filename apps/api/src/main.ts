import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Загружаем переменные из корневого .env файла в самом начале
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Используем порт из .env, а если его нет, то 5001 по умолчанию
  const port = process.env.API_PORT || 5001;

  await app.listen(port);

  console.log(`✅ API application is running on: http://localhost:${port}`);
}
bootstrap();
