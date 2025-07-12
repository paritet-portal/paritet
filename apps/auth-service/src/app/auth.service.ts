import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterClientDto, RegisterSpecialistDto } from '@paritet/auth-dtos';
import { UserRole } from '@paritet/shared-types';
import * as bcrypt from 'bcrypt';
import { KafkaService } from '../kafka/kafka.service';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly kafkaService: KafkaService,
  ) { }


  async registerClient(registerDto: RegisterClientDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        role: UserRole.CLIENT,
      },
    });

    this.kafkaService.emitClientRegistered({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role as UserRole,
      clientProfileData: {
        fullName: registerDto.fullName,
        phoneNumber: registerDto.phoneNumber,
      },
    });

    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }


  async registerSpecialist(registerDto: RegisterSpecialistDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        role: UserRole.SPECIALIST,
      },
    });

    this.kafkaService.emitSpecialistRegistered({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role as UserRole,
      specialistProfileData: {
        fullName: registerDto.fullName,
        phoneNumber: registerDto.phoneNumber,
        specialistType: registerDto.specialistType,
        locationCountry: registerDto.locationCountry,
        locationCity: registerDto.locationCity,
        countryCode: registerDto.countryCode,
        licenseNumber: registerDto.licenseNumber,
        referrer: registerDto.referrer,
      }
    });

    const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
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

    return {
      accessToken,
      user: { id: user.id, email: user.email, role: user.role }
    };
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch (err) {
      return { valid: false, userId: null, role: null };
    }
  }
}
