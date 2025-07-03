import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterUserDto) {
    const { email, password, role } = registerDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    // ВАЖЛИВО: На цьому етапі ми пізніше додамо відправку події в Kafka.
    // Поки що просто повертаємо створеного користувача (без пароля).
    const { password: _, ...result } = newUser;
    return result;
  }
  
  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    
    // Повертаємо токен та дані користувача
    return { 
        accessToken, 
        user: { id: user.id, email: user.email, role: user.role } 
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      // Додатково можна перевірити, чи існує такий користувач в БД
      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch (err) {
      return { valid: false, userId: null, role: null };
    }
  }
}
