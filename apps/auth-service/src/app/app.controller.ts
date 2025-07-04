import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterClientDto } from '@paritet/auth-dtos';
import { LoginDto } from '@paritet/auth-dtos';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth-register-client')
  async registerClient(@Payload() registerDto: RegisterClientDto) {
    return this.authService.registerClient(registerDto);
  }

  @MessagePattern('auth-login')
    async login(@Payload() loginDto: LoginDto){
      return this.authService.login(loginDto)
  }
  @MessagePattern('validate-token')
  async validateToken(@Payload() token:string){
    return this.authService.validateToken(token)
  }
}
