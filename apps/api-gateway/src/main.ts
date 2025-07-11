import { Logger, ValidationPipe } from '@nestjs/common'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Увімкни все
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));
  
  app.enableCors({
    origin: true, 
    credentials: true,
  });

  const port = process.env.PORT || 3333; 
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();