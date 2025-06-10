import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../../.env' });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5003;



  await app.listen(port);

  console.log(`✅ API application is running on: http://localhost:${port}`);
}
bootstrap();
