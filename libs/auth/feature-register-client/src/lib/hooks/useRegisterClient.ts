import { useMutation } from '@tanstack/react-query';
import { authApi } from '@paritet/auth-data-access';
import { RegisterClientFormData } from '../validation/register.schema';

export function useRegisterClient() {
  return useMutation({
    mutationFn: async (data: RegisterClientFormData) => {
      const { confirmPassword, terms, ...payload } = data; 
      return await authApi.registerClient(payload);
    },
  });
}




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