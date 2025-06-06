import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // <-- Раскомментировали/добавили

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService], // <-- Раскомментировали/добавили
})
export class AppModule {}
