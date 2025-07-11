// libs/auth/feature-register-specialist/src/lib/components/SpecialistRegistrationForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@paritet/shared-ui';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '../validation/register.schema';

import { useRegisterSpecialist } from '../hooks/useRegisterSpecialist';
import { CustomCountryCodeSelector } from './CustomCountryCodeSelector';

interface CountryOptionType {
  value: string;
  label: string;
  countryCode: string;
  flagUrl: string;
  cca2: string;
}

export function SpecialistRegistrationForm() {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null); 
  const { register: registerApi, isLoading, error } = useRegisterSpecialist();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
    getValues
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      countryCode: 'UA',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
    // Если вы хотите, чтобы reCAPTCHA была частью валидации RHF (например, чтобы поле показывало ошибку, если токен не получен):
    // setValue('recaptchaToken', token); // Предполагая, что у вас есть такое поле в RegisterFormData и schema
  };
 const getInputFieldClass = (fieldName: keyof RegisterFormData) => {
    // Базовые классы для всех полей
    const baseClasses = "block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    // Классы, которые будут добавлены при наличии ошибки
    const errorClasses = "border-red-500 focus:ring-red-500 outline-red-500 outline-offset-2 outline-2";

    // Проверяем, есть ли вообще информация об ошибках для этого поля
    // errors[fieldName] может быть undefined, если поле вообще не зарегистрировано или не валидировалось
    // errors[fieldName]?.message проверяет, есть ли само сообщение об ошибке
    const hasError = errors[fieldName] && errors[fieldName]?.message;

    // Собираем финальные классы.
    // Если есть ошибка, добавляем errorClasses к baseClasses.
    // Если ошибки нет, применяем стандартные классы рамки и фокуса.
    if (hasError) {
      return `${baseClasses} ${errorClasses}`;
    } else {
      // Возвращаем базовые классы с правильными фокусными стилями для "не ошибочных" состояний
      return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-500`;
    }
  };

  const [countriesForPhone, setCountriesForPhone] = useState<CountryOptionType[]>([]);
  const [selectedCountryForPhone, setSelectedCountryForPhone] = useState<CountryOptionType | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
        const data = await response.json();

        const formattedCountries: CountryOptionType[] = data
          .map((country: any) => {
            const countryName = country.name.common;
            const cca2Code = country.cca2;
            const callingCodes = country.idd?.suffixes?.[0] || '';
            const prefix = country.idd?.root ? `${country.idd.root}${callingCodes}` : '';
            const flagUrl = `https://flagcdn.com/w160/${cca2Code.toLowerCase()}.png`;

            return {
              value: countryName,
              label: countryName,
              countryCode: prefix,
              flagUrl: flagUrl,
              cca2: cca2Code,
            };
          })
          .filter((country: CountryOptionType) => country.countryCode && country.cca2);

        const ukraine = formattedCountries.find(c => c.label === 'Ukraine');
        if (ukraine) {
          setSelectedCountryForPhone(ukraine);
          setValue('countryCode', ukraine.countryCode);
        }

        setCountriesForPhone(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [setValue]);
   const onSubmit = async (data: RegisterFormData) => {
    // Проверяем, прошел ли пользователь reCAPTCHA
    if (!recaptchaValue) {
      alert("Please verify you are not a robot."); // Можно сделать красивее с помощью toast или ошибки формы
      return;
    }

    // Формируем полный номер телефона с кодом страны
    const fullPhoneNumber = `${data.countryCode}${data.phone.replace(/\s+/g, '')}`;
    // Вызываем API регистрации, передавая остальные поля и полный номер
    await registerApi({ ...data, phone: fullPhoneNumber, recaptchaToken: recaptchaValue }); // Передаем токен reCAPTCHA
  };


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const handleSpecialistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedRole(value);
  };

  return (
    
    <>
    {console.log('Current form errors:', errors)}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
      >
        {/* Left Column */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип спеціалісту<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
              {...register('specialistType')}

                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              >
                <option value="" disabled>Виберіть зі списку</option>
                <option value="lawyer">Юрист</option>
                <option value="attorney">Адвокат</option>
                <option value="barrister">Баристер</option>
                <option value="solicitor">Солісітор</option>
                <option value="corporate-lawyer">Корпоративний юрист</option>
                <option value="tax-lawyer">Податковий юрист</option>
                <option value="civil-lawyer">Цивільний юрист</option>
                <option value="criminal-lawyer">Кримінальний юрист</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.specialistType?.message && <p className="text-red-500 text-sm mt-1">{errors.specialistType.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="Введіть свій Email"
              
              className={getInputFieldClass('email')}
            />
            {errors.email?.message && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль<span className="text-red-500">*</span>
            </label>
            <div className="relative"> 
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'} 
                placeholder="Введіть свій пароль"
               
                className={getInputFieldClass('password')}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} 
              >
                 {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.4258 11.5063C14.4258 12.9892 13.2275 14.1875 11.7446 14.1875C10.2618 14.1875 9.06348 12.9892 9.06348 11.5063C9.06348 10.0235 10.2618 8.82518 11.7446 8.82518C13.2275 8.82518 14.4258 10.0235 14.4258 11.5063Z" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.745 18.0036C14.8998 18.0036 17.8401 16.3692 19.8867 13.5407C20.6911 12.4329 20.6911 10.5707 19.8867 9.46284C17.8401 6.63428 14.8998 5 11.745 5C8.59018 5 5.64986 6.63428 3.60326 9.46284C2.79891 10.5707 2.79891 12.4329 3.60326 13.5407C5.64986 16.3692 8.59018 18.0036 11.745 18.0036Z" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.9338 6.35603C13.9172 5.96927 12.8438 5.76614 11.7437 5.76614C8.65733 5.76614 5.78083 7.36495 3.77864 10.1321C2.99176 11.2159 2.99176 13.0377 3.77864 14.1215C4.17625 14.671 4.60835 15.1745 5.06972 15.6284M18.1479 8.36839C18.7113 8.88696 19.2345 9.47678 19.7087 10.1321C20.4956 11.2159 20.4956 13.0377 19.7087 14.1215C17.7065 16.8887 14.83 18.4874 11.7437 18.4874C10.5322 18.4874 9.35297 18.2411 8.24632 17.7744" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.366 12.131C14.366 13.5817 13.1937 14.7539 11.7431 14.7539M13.5788 10.2559C13.106 9.79305 12.4583 9.50803 11.7431 9.50803C10.2924 9.50803 9.12012 10.6803 9.12012 12.131C9.12012 12.7686 9.34662 13.3525 9.7237 13.8067" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round"
                    
                    />
                    <path d="M3 20L20.4863 4.00001" stroke="#0E0E0F" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
            {errors.password?.message && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Місце проживання<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select

                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              >
                <option value="">Виберіть країну</option>
                <option value="ua">Україна</option>
                <option value="pl">Польща</option>
                <option value="de">Німеччина</option>
                <option value="fr">Франція</option>
                <option value="es">Іспанія</option>
                <option value="it">Італія</option>
                <option value="pt">Португалія</option>
                <option value="ro">Румунія</option>
                <option value="hu">Угорщина</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.locationCountry?.message && <p className="text-red-500 text-sm mt-1">{errors.locationCountry.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефону
            </label>
            <div className="flex">
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <CustomCountryCodeSelector
                    options={countriesForPhone}
                    value={selectedCountryForPhone}
                    onChange={(selected) => {
                      field.onChange(selected ? selected.countryCode : '');
                      setSelectedCountryForPhone(selected);
                    }}
                    placeholder="Код країни"
                  />
                )}
              />
              <input
                {...register('phone')}
                type="tel"
                placeholder="Ваш номер"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {errors.phone?.message && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ПІБ або Назва компанії<span className="text-red-500">*</span>
            </label>
            <input
              {...register('fullName')}
              type="text"
              placeholder="Введіть свої ПІБ"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.fullName?.message && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              № ліцензії/свідоцтва<span className="text-red-500">*</span>
            </label>
            <input
              {...register('licenseNumber')}
              type="text"
              placeholder="Введіть свої дані"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.licenseNumber?.message && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber.message}</p>}
          </div>

          {/* Повтор пароля */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль ще раз<span className="text-red-500">*</span>
            </label>
            <div className="relative"> {/* Оборачиваем input и иконку в relative div */}
              <input
                {...register("confirmPassword", { // <-- Вот здесь изменения
                  validate: (value) => {
                    // Получаем значение поля password с помощью getValues

                    console.log(`Validation for confirmPassword:
                  - current value (from validate): ${value}
                  - getValues('password'): ${passwordValue}
                  - getValues('confirmPassword'): ${confirmPasswordValue}
                  - comparison result (passwords match?): ${passwordValue === confirmPasswordValue}
                  - return value: ${passwordValue === confirmPasswordValue || "Паролі не співпадають"}
                `);
                   return getValues("password") !== getValues("confirmPassword") && "Паролі не співпадають"
                    // const passwordValue = getValues("password");
                    // // Сравниваем и возвращаем ошибку, если они не совпадают
                    // return value === passwordValue || "Паролі не співпадають";
                  }
                })}
                type={showConfirmPassword ? 'text' : 'password'} // <<< Динамический тип поля
                placeholder="Повторіть свій пароль"
                className={getInputFieldClass('confirmPassword')}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // <<< Переключение состояния
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.4258 11.5063C14.4258 12.9892 13.2275 14.1875 11.7446 14.1875C10.2618 14.1875 9.06348 12.9892 9.06348 11.5063C9.06348 10.0235 10.2618 8.82518 11.7446 8.82518C13.2275 8.82518 14.4258 10.0235 14.4258 11.5063Z" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.745 18.0036C14.8998 18.0036 17.8401 16.3692 19.8867 13.5407C20.6911 12.4329 20.6911 10.5707 19.8867 9.46284C17.8401 6.63428 14.8998 5 11.745 5C8.59018 5 5.64986 6.63428 3.60326 9.46284C2.79891 10.5707 2.79891 12.4329 3.60326 13.5407C5.64986 16.3692 8.59018 18.0036 11.745 18.0036Z" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.9338 6.35603C13.9172 5.96927 12.8438 5.76614 11.7437 5.76614C8.65733 5.76614 5.78083 7.36495 3.77864 10.1321C2.99176 11.2159 2.99176 13.0377 3.77864 14.1215C4.17625 14.671 4.60835 15.1745 5.06972 15.6284M18.1479 8.36839C18.7113 8.88696 19.2345 9.47678 19.7087 10.1321C20.4956 11.2159 20.4956 13.0377 19.7087 14.1215C17.7065 16.8887 14.83 18.4874 11.7437 18.4874C10.5322 18.4874 9.35297 18.2411 8.24632 17.7744" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.366 12.131C14.366 13.5817 13.1937 14.7539 11.7431 14.7539M13.5788 10.2559C13.106 9.79305 12.4583 9.50803 11.7431 9.50803C10.2924 9.50803 9.12012 10.6803 9.12012 12.131C9.12012 12.7686 9.34662 13.3525 9.7237 13.8067" stroke="#0E0E0F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 20L20.4863 4.00001" stroke="#0E0E0F" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
            {errors.confirmPassword?.message && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Місто/село<span className="text-red-500">*</span>
            </label>
            <input
              {...register('locationCity')}
              type="text"
              placeholder="Виберіть місто/село"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.locationCity?.message && <p className="text-red-500 text-sm mt-1">{errors.locationCity.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Спеціаліст, який залучив Вас
            </label>
            <input
              {...register('referrer')}
              type="text"
              placeholder="Введіть ПІБ спеціаліста"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {/* Валидация для referrer опциональна, поэтому сообщение об ошибке может не понадобиться */}
          </div>
        </div>
      </form>

       <div className="col-span-2"> {/* Размещаем reCAPTCHA на всю ширину */}
          <div className="mb-10">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcDgnwrAAAAAPMwdQ93htfMzdBv68XsXlXear_0'} // <-- ВАШ ПУБЛИЧНЫЙ КЛЮЧ RECAPTCHA
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
              theme="light" // Или "dark"
            />
            {/* Простая проверка ошибки, если хотите */}
            {/* {!recaptchaValue && (
              <p className="text-red-500 text-sm mt-1">Please complete the reCAPTCHA.</p>
            )} */}
          </div>
        </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading || isSubmitting} >
        {isLoading || isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
      </Button>

      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </>
  );
}