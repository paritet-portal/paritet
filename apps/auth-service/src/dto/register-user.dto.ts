import { UserRole } from '@internal/prisma-auth-client';

import { IsString, IsEmail, IsEnum, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    email!: string; 

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string; 

    @IsEnum(UserRole)
    @IsNotEmpty()
    role!: UserRole; 
}