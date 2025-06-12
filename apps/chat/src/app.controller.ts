import { Body, Controller, Get, Logger, Post } from '@nestjs/common'; // Добавлен Logger
import { AppService } from './app.service';
import { MessageDocument } from './message.schema'; // Убедитесь, что импорт корректен

// Зададим префикс для всех роутов этого контроллера, например, 'chat-api'
@Controller('chat-api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get() // Будет доступен по /chat-api
  getHello(): string {
    this.logger.log('GET /chat-api called');
    return this.appService.getHello();
  }

  // Новый эндпоинт для получения всех сообщений
  @Get('messages') // Будет доступен по /chat-api/messages
  async getAllMessages(): Promise<MessageDocument[]> {
    this.logger.log('GET /chat-api/messages called');
    return this.appService.findAllMessages();
  }

  // (Опционально) Эндпоинт для создания сообщения для тестирования
  @Post('messages') // Будет доступен по POST /chat-api/messages
  async createNewMessage(
    @Body() createMessageDto: { text: string; sender: string; roomId: string },
  ): Promise<MessageDocument> {
    this.logger.log(`POST /chat-api/messages called with DTO: ${JSON.stringify(createMessageDto)}`);
    return this.appService.createMessage(
      createMessageDto.text,
      createMessageDto.sender,
      createMessageDto.roomId,
    );
  }
}

// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
