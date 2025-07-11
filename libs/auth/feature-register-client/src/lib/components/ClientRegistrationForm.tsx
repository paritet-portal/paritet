//libs\auth\feature-register-client\src\lib\components\ClientRegistrationForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegisterClient } from '../hooks/useRegisterClient';
import { RegisterClientFormData, registerClientSchema } from '../validation/register.schema';

export function ClientRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientFormData>({
    resolver: zodResolver(registerClientSchema),
  });

  const { mutateAsync, isPending } = useRegisterClient();

  const onSubmit = async (data: RegisterClientFormData) => {
    try {
      await mutateAsync(data);
      // TODO: Redirect or show success toast
    } catch (error) {
      // TODO: Show error toast
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
      <div>
        <input {...register('fullName')} placeholder="ПІБ" className="input" />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      </div>
      <div>
        <input {...register('email')} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <input type="password" {...register('password')} placeholder="Пароль" className="input" autoComplete="new-password" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <div>
        <input type="password" {...register('confirmPassword')} placeholder="Пароль ще раз" className="input" autoComplete="new-password" />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <input {...register('phoneNumber')} placeholder="+380" className="input" />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
      </div>
      <div className="flex items-center">
        <input type="checkbox" {...register('terms')} className="mr-2" />
        <label>Натискаючи кнопку "Зареєструватися", я погоджуюсь з правилами порталу</label>
      </div>
      {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
        disabled={isPending}
      >
        {isPending ? 'Реєстрація...' : 'Зареєструватися'}
      </button>
    </form>
  );
}


























