// apps/backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { PrismaClientOptions } from '@prisma/client/runtime/library'; // Можно раскомментировать для строгой типизации options

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // Конструктор остается таким, какой он есть, он будет принимать options из провайдера модуля
  constructor(options?: any) { // Сделаем options необязательными на всякий случай, если PrismaClient это позволяет
    super(options);
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ [BackendService] Prisma Client connected to PostgreSQL'); // Добавим лог
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ [BackendService] Prisma Client disconnected from PostgreSQL'); // Добавим лог
  }
}
