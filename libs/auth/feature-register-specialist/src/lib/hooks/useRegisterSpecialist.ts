//libs\auth\feature-register-specialist\src\lib\hooks\useRegisterSpecialist.ts

import { authApi } from '@paritet/auth-data-access';
import { useMutation } from '@tanstack/react-query';
import { RegisterSpecialistSchema } from '../validation/register.schema';

export function useRegisterSpecialist () {
  return useMutation({
    mutationFn: async (data: RegisterSpecialistSchema) => {
      const { confirmPassword, terms, ...payload } = data; 
      return await authApi.registerClient(payload);
    },
  });
}


