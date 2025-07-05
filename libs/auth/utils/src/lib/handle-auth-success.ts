import { AuthResponse } from '@paritet/auth-data-access';

interface HandleAuthSuccessOptions {
  authData: AuthResponse;
  callbackUrl?: string | null;
}

export function handleAuthSuccess({ authData, callbackUrl }: HandleAuthSuccessOptions) {
  // 1. Встановлення cookie з токеном (це робить бекенд, тут ми нічого не робимо)
  // 2. Збереження даних користувача в глобальному стані (напр., через Zustand/Context)
  // useAuthStore.setState({ user: authData.user });

  // 3. Перенаправлення
  if (callbackUrl) {
    window.location.href = callbackUrl;
    return;
  }
  
  if (authData.user.role === 'specialist') {
    window.location.href = process.env.NEXT_PUBLIC_SPECIALIST_APP_URL;
  } else {
    window.location.href = process.env.NEXT_PUBLIC_CLIENT_APP_URL;
  }
}