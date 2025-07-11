import { RegisterClientPayload } from '@paritet/shared-types';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsPhoneNumber } from 'class-validator';

export class RegisterClientDto implements RegisterClientPayload {
    @IsString()
    @IsNotEmpty({ message: 'Full name cannot be empty' })
    fullName!: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password!: string;

    @IsOptional()
    @IsPhoneNumber(undefined, { message: 'Please provide a valid phone number' })
    phoneNumber?: string;
}
