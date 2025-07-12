import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, RegisterClientDto, RegisterSpecialistDto } from '@paritet/auth-dtos';
import { AUTH_PATTERNS } from '@paritet/config';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER_CLIENT)
  async registerClient(@Payload() registerDto: RegisterClientDto) {
    return this.authService.registerClient(registerDto);
  }
  
  @MessagePattern(AUTH_PATTERNS.REGISTER_SPECIALIST)
  async registerSpecialist(@Payload() registerDto: RegisterSpecialistDto) {
    return this.authService.registerSpecialist(registerDto);
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
