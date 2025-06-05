@Controller('chat') // ИЗМЕНИТЬ НА ЭТО!
export class AppController {
  @Get() // Должно быть так
  getHello(): string { return 'Hello from Chat Service!'; }
}