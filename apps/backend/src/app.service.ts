import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Наш метод для получения пользователей из БД
  async getUsers() {
    return this.prisma.user.findMany();
  }
}
