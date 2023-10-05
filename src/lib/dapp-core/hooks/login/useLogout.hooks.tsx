'use client';

import { useAuthContext } from '../../providers/Authentification.providers';

export const useLogout = () => {
  const authContext = useAuthContext();

  return async () => {
    if (!authContext?.loginMethod) {
      throw new Error('user is no loggedIn');
    }

    authContext.logout();

    const provider = authContext.providers[authContext.loginMethod];

    if ('init' in provider) {
      await provider.init();
    }

    await provider.logout();
  };
};
