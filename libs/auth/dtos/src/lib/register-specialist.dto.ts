// libs/auth/dtos/src/lib/register-specialist.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
// Вам может понадобиться импортировать типы из @paritet/shared-types, если они есть для специалиста
// import { RegisterSpecialistPayload } from '@paritet/shared-types'; 

export class RegisterSpecialistDto /* implements RegisterSpecialistPayload */ { 
    @IsString()
    @IsNotEmpty({ message: "ПІБ або назва компанії є обов'язковим полем" })
    fullName!: string;

    @IsEmail({}, { message: "Неправильний формат Email" })
    email!: string;

    @IsString()
    @MinLength(8, { message: "Пароль має містити щонайменше 8 символів" }) 
    password!: string;

    @IsString()
    @IsNotEmpty({ message: "Тип спеціаліста є обов'язковим полем" })
    specialistType!: string;

    @IsString()
    @IsNotEmpty({ message: "Країна проживання є обов'язковою" })
    locationCountry!: string;

    @IsString()
    @IsNotEmpty({ message: "Місто/село є обов'язковим полем" })
    locationCity!: string;

    @IsString()
    @IsNotEmpty({ message: "Номер телефону є обов'язковим" })
    @MinLength(7, { message: "Номер телефону має містити щонайменше 7 цифр" }) 
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty({ message: "Код країни є обов'язковим" })
    countryCode!: string;

    @IsString()
    @IsNotEmpty({ message: "Номер ліцензії є обов'язковим полем" })
    licenseNumber!: string;

    @IsOptional()
    @IsString()
    referrer?: string;

    // ReCAPTCHA токен, если он валидируется на бэкенде
    // @IsString()
    // @IsNotEmpty({ message: "ReCAPTCHA токен є обов'язковим" })
    // recaptchaToken!: string; 

    //Terms не валідируются на бэкенде, так как это фронтенд-валидация
}