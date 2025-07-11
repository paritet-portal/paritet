import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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






























// 'use client';

// import { Button } from '@paritet/shared-ui'; // Предполагаем, что Button корректно обрабатывает type="submit"
// import React, { useState } from 'react';
// import { useRegisterClient } from '../hooks/useRegisterClient'; // Путь к вашему хуку

// export function ClientRegistrationForm() {
//   const { register, isLoading, error } = useRegisterClient();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     passwordConfirmation: '', // Новое поле для подтверждения пароля
//     phoneNumber: '', // Новое поле для номера телефона
//     // Добавьте сюда любые другие поля, которые будут в форме
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // Динамически обновляем состояние по имени поля
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault(); // Предотвращаем стандартное поведение формы

//     // Здесь можно добавить валидацию перед отправкой, например:
//     // if (formData.password !== formData.passwordConfirmation) {
//     //   alert('Пароли не совпадают!');
//     //   return;
//     // }
//     // if (!formData.fullName || !formData.email || !formData.password) {
//     //   alert('Все обязательные поля должны быть заполнены!');
//     //   return;
//     // }

//     // Вызываем хук для регистрации, передавая все данные формы
//     register(formData);
//   };

//   return (
//     <>
//       {/* Важно: Кнопка должна быть внутри формы для корректной работы type="submit" */}
//       <form onSubmit={handleSubmit} className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column (Client Form) */}
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Інформація про клієнта</h2>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               ПІБ<span className="text-red-500">*</span>
//             </label>
//             <input
//               name="fullName" // Важно: должно совпадать с ключом в formData
//               value={formData.fullName} // Связываем значение поля с состоянием
//               onChange={handleChange} // Обрабатываем изменение значения
//               type="text"
//               placeholder="Введіть свої ПІБ"
//               required // Добавляем обязательность поля
//               className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Пароль<span className="text-red-500">*</span>
//             </label>
//             <input
//               name="password" // Важно: должно совпадать с ключом в formData
//               value={formData.password} // Связываем значение поля с состоянием
//               onChange={handleChange} // Обрабатываем изменение значения
//               type="password"
//               placeholder="Введіть свій пароль"
//               required // Добавляем обязательность поля
//               className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Номер телефону
//             </label>
//             <div className="flex">
//               <div className="flex items-center px-4 border border-gray-300 rounded-l-md bg-gray-100">
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg" alt="Ukraine Flag" className="h-5 w-5 mr-2" />
//                 <span className="text-gray-700">+38</span>
//               </div>
//               <input
//                 name="phoneNumber" // Важно: должно совпадать с ключом в formData
//                 value={formData.phoneNumber} // Связываем значение поля с состоянием
//                 onChange={handleChange} // Обрабатываем изменение значения
//                 type="tel"
//                 placeholder="Ваш номер"
//                 className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Right Column (Consumer Form) */}
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Додаткова інформація</h2>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email<span className="text-red-500">*</span>
//             </label>
//             <input
//               name="email" // Важно: должно совпадать с ключом в formData
//               value={formData.email} // Связываем значение поля с состоянием
//               onChange={handleChange} // Обрабатываем изменение значения
//               type="email"
//               placeholder="Введіть свій Email"
//               required // Добавляем обязательность поля
//               className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Пароль ще раз<span className="text-red-500">*</span>
//             </label>
//             <input
//               name="passwordConfirmation" // Важно: должно совпадать с ключом в formData
//               value={formData.passwordConfirmation} // Связываем значение поля с состоянием
//               onChange={handleChange} // Обрабатываем изменение значения
//               type="password"
//               placeholder="Повторіть свій пароль"
//               required // Добавляем обязательность поля
//               className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />
//           </div>

//           {/* Добавьте сюда другие поля, если они есть */}

//         </div>

//         {/* Кнопка SUBMIT должна быть внутри формы */}
//         <div className="lg:col-span-2"> {/* Растягиваем кнопку на две колонки */}
//           <Button
//             type="submit" // Указываем тип кнопки как submit
//             disabled={isLoading}
//             className="w-full px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" // Замените на желаемые стили для кнопки
//           >
//             {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
//           </Button>
//         </div>
//       </form>

//       {error && <p className="text-red-500 mt-4 text-center">Помилка реєстрації: {error.message}</p>}
//     </>
//   );
// }