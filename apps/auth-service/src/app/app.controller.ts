import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterClientDto } from '@paritet/auth-dtos';
import { LoginDto } from '@paritet/auth-dtos';
import { AUTH_PATTERNS } from '@paritet/config';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER_CLIENT)
  async registerClient(@Payload() registerDto: RegisterClientDto) {
    return this.authService.registerClient(registerDto);
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
    async login(@Payload() loginDto: LoginDto){
      return this.authService.login(loginDto)
  }
  @MessagePattern('validate-token')
  async validateToken(@Payload() token:string){
    return this.authService.validateToken(token)
  }
}
