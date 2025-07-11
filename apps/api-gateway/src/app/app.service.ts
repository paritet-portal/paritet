import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS } from '@paritet/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  async testAuthService() {
    const result = await firstValueFrom(
      this.authClient.send(AUTH_PATTERNS.LOGIN, {
        email: 'test@example.com',
        password: '123456',
      }),
    );

    return result;
  }
}
