import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterClientDto, RegisterSpecialistDto } from '@paritet/auth-dtos';
import { AUTH_PATTERNS } from '@paritet/config';
import { firstValueFrom } from 'rxjs';

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy
    ) { }
    @Post('login')
    async login(@Body() loginDto: LoginDto) { 
        return await firstValueFrom(this.authClient.send(AUTH_PATTERNS.LOGIN, loginDto));
    }

    @Post('register/client')
    async registerClient(@Body() registerClientDto: RegisterClientDto) {
        const payload = {
            ...registerClientDto,
            role: 'CLIENT',
        };

        return await firstValueFrom(this.authClient.send(AUTH_PATTERNS.REGISTER_CLIENT, payload));
    }

    @Post('register/specialist') 
    async registerSpecialist(@Body() registerSpecialistDto: RegisterSpecialistDto) { 
        const payload = {
            ...registerSpecialistDto,
            role: 'SPECIALIST', 
        };
        return await firstValueFrom(this.authClient.send(AUTH_PATTERNS.REGISTER_SPECIALIST, payload)); 
    }
}