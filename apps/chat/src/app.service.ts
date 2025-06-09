// apps/chat/src/app.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  // Внедряем само подключение к Mongoose
  constructor(@InjectConnection() private connection: Connection) {}

  // Этот метод выполнится, когда все модули будут инициализированы
  onModuleInit() {
    // Проверяем статус подключения
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    console.log('------------------------------------------');
    console.log('ПРОВЕРКА ПОДКЛЮЧЕНИЯ К MONGODB');
    console.log(`Статус подключения: ${this.connection.readyState}`);
    if (this.connection.readyState === 1) {
      console.log('✅ Подключение к MongoDB успешно установлено!');
    } else {
      console.log('❌ НЕ удалось подключиться к MongoDB.');
    }
    console.log('------------------------------------------');
  }
}
