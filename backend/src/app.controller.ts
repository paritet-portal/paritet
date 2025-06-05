@Controller('api') // Должно быть так
export class AppController {
  @Get() // Должно быть так
  getHello(): string { return 'Hello World!'; }
}