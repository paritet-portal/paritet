import { Controller, Post, Body, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterClientDto } from '@paritet/auth-dtos';
import { LoginDto } from '@paritet/auth-dtos';
import { AUTH_PATTERNS } from '@paritet/config';

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
}