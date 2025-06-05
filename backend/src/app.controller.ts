import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // <-- ИЗМЕНИТЬ НА ЭТО!
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Это теперь будет обрабатывать /chat/
  getHello(): string {
    return this.appService.getHello();
  }
}