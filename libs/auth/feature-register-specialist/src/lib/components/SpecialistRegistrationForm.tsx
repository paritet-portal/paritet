// libs/auth/feature-register-specialist/src/lib/components/SpecialistRegistrationForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDown, Button, HidePassword, ShowPassword } from '@paritet/shared-ui';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from 'react-hook-form';
import { RegisterSpecialistSchema, registerSchema } from '../validation/register.schema';

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

  const { mutateAsync, isPending,error  } = useRegisterSpecialist();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues
  } = useForm<RegisterSpecialistSchema>({
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
  };
  const getInputFieldClass = (fieldName: keyof RegisterSpecialistSchema) => {
    const baseClasses = "block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

    const errorClasses = "border-red-500 focus:ring-red-500 outline-red-500 outline-offset-2 outline-2";

    const hasError = errors[fieldName] && errors[fieldName]?.message;

    if (hasError) {
      return `${baseClasses} ${errorClasses}`;
    } else {
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

  const onSubmit = async (data: RegisterSpecialistSchema) => {
    if (!recaptchaValue) {
      alert("Please verify you are not a robot.");
      return;
    }

    const fullPhoneNumber = `${data.countryCode}${data.phoneNumber.replace(/\s+/g, '')}`;

    await mutateAsync({ ...data, phoneNumber: fullPhoneNumber });
    // await mutateAsync({ ...data, phone: fullPhoneNumber, recaptchaToken: recaptchaValue });
  };


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



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
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ArrowDown className="h-5 w-5 text-gray-400"/>
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
                  <ShowPassword />
                ) : (
                  <HidePassword />
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
               {...register('locationCountry')}

                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
              >
                <option value="">Виберіть країну</option>
                <option value="ua">Україна</option>
                <option value="pl">Польща</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                 <ArrowDown className="h-5 w-5 text-gray-400"/>
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
                  />
                )}
              />
              <input
                {...register('phoneNumber')}
                type="tel"
                placeholder="Ваш номер"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {errors.phoneNumber?.message && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль ще раз<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Повторіть свій пароль"
                className={getInputFieldClass('confirmPassword')}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <ShowPassword />
                ) : (
                  <HidePassword />
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
          </div>
        </div>


        <div className="col-span-2 flex flex-col items-center mt-8">

          <div className="mb-10 w-full flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcDgnwrAAAAAPMwdQ93htfMzdBv68XsXlXear_0'}
              onChange={handleRecaptchaChange}
              ref={recaptchaRef}
              theme="light"
            />
          </div>

          <Button type="submit" disabled={!recaptchaValue || isPending || isSubmitting} >
            {isPending || isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>

          <div className="flex items-center mt-4 mb-4">
            <input
              type="checkbox"
              {...register('terms')}
              id="terms-checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
            />
            <label
              htmlFor="terms-checkbox"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Натискаючи кнопку "Зареєструватися", я погоджуюсь з правилами порталу
            </label>
          </div>

          {errors.terms && <p className="text-red-500 text-sm mt-1 text-center w-full">{errors.terms.message}</p>}
          {error && <p className="text-red-500 mt-4 text-center w-full">{error.message}</p>}
        </div>


      </form>



    </>
  );
}