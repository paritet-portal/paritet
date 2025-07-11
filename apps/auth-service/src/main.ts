/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
      // host: process.env.AUTH_SERVICE_HOST || '0.0.0.0',
      // port: parseInt(process.env.AUTH_SERVICE_PORT || '4001', 10),
      host: 'localhost',
      port: 4001,
    },
  }
);
  await app.listen()
  
  Logger.log(
    `🚀 Auth Service is running TCP port ${process.env.AUTH_SERVICE_PORT}`
  );
}

bootstrap();
