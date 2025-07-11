import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

   @Get('test-auth')
  async testAuth() {
    console.log('[TEST AUTH] controller running');

    try {
      const response = await this.appService.testAuthService();
      return response;
    } catch (err) {
      console.error('[AUTH TEST ERROR]', err);
      throw new InternalServerErrorException('Auth service failed');
    }
  }
}
