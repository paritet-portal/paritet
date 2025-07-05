// всередині libs/auth/feature-login/src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@paritet/auth-data-access';

export const useLogin = () => {
    const { mutate: login, ... } = useMutation({
        mutationFn: (credentials) => authApi.login(credentials) // <-- ОСЬ ТУТ ВИКЛИК!
    });

    return { login, ... };
}