import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5003;
  await app.listen(port);
  console.log(`✅ API application is running on: http://localhost:${port}`);
}
bootstrap();
