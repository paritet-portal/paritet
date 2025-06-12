// apps/chat/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.CHAT_PORT || 5002; // Используем CHAT_PORT, 3000 - как запасной вариант по умолчанию
  await app.listen(port);
  console.log(`🚀 Chat service is running on: http://localhost:${port}`);
}
bootstrap();


// //paritet\apps\chat\src\main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     bodyParser: true,
//   });




//   await app.listen(process.env.PORT ?? 5002);
// }
// bootstrap();


