// Тимчасова заглушка для хука

export const useRegisterClient = () => {
  console.warn(
    'Warning: useRegisterSpecialist is a mock and does not perform real API calls yet.'
  );

  // Імітуємо API хука React Query, щоб компонент, який його використовує, не зламався
  const register = (data: any) => {
    console.log('Attempting to register specialist with data:', data);
    // Нічого не робимо, бо залежності ще немає
  };

  return {
    register,
    isLoading: false, // Завжди false
    error: null,      // Завжди null
  };
};



// // libs/specialist/feature-register/src/lib/hooks/useRegisterSpecialist.ts
// import { authApi } from '@paritet/auth/data-access';
// import { useMutation } from '@tanstack/react-query';

// export const useRegisterSpecialist = (options?: { onSuccess?: () => void }) => {
//   const { mutate, isPending, error } = useMutation({
//     mutationFn: authApi.registerSpecialist,
//     onSuccess: () => {
//       console.log('Specialist registered successfully!');
//       options?.onSuccess?.();
//     },
//     onError: (err) => {
//       console.error('Specialist registration failed:', err);
//     }
//   });

//   return {
//     register: mutate,
//     isLoading: isPending,
//     error,
//   };
// };