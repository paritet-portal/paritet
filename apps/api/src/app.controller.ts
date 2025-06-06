import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Добавим префикс 'api' для порядка
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  // Раскомментировали/добавили эндпоинт для пользователей
  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }
}
