import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema'; // Убедитесь, что импорт корректен

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    // Инжектируем Mongoose модель для сообщений
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {
    this.logger.log('AppService initialized, MessageModel injected.');
  }

  getHello(): string {
    return 'Hello from Chat Service with MongoDB!';
  }

  // Метод для создания сообщения (понадобится для тестирования или будущего API)
  async createMessage(text: string, sender: string, roomId: string): Promise<MessageDocument> {
    const newMessage = new this.messageModel({ text, sender, roomId });
    this.logger.log(`Creating message: ${text} from ${sender} in room ${roomId}`);
    return newMessage.save();
  }

  // Метод для получения всех сообщений (аналог вашего /api/users)
  async findAllMessages(): Promise<MessageDocument[]> {
    this.logger.log('Fetching all messages from MongoDB');
    return this.messageModel.find().exec(); // .exec() возвращает Promise
  }

  // (Опционально) Метод для сидинга, если вы хотите его вызывать из сервиса, а не только через отдельный скрипт
  // Можно вызвать его в onModuleInit, например
  async seedInitialMessages() {
    const existingMessagesCount = await this.messageModel.countDocuments();
    if (existingMessagesCount === 0) {
      this.logger.log('🌱 No messages found in DB, seeding initial messages from AppService...');
      await this.createMessage('Service: First Message!', 'AppServiceSeed', 'general');
      await this.createMessage('Service: Another one!', 'AppServiceSeed', 'general');
      this.logger.log('👍 Initial messages seeded from AppService!');
    } else {
      this.logger.log(`ℹ️ ${existingMessagesCount} messages already exist, skipping AppService seeding.`);
    }
  }
}

// import { Injectable, Logger } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   private readonly logger = new Logger(AppService.name);

//   constructor() {
//     // Этот лог поможет убедиться, что сервис инициализируется
//     this.logger.log('AppService initialized in Chat app');
//   }

//   getHello(): string {
//     return 'Hello from Chat Service!';
//   }
// }
