'use client';

import * as React from 'react';

import { useAuthContext } from '../../providers/Authentification.providers';
import { LoginMethodsEnum } from '../../types/login.types';

export type Props = {
  redirectDelayMilliseconds?: number;
};

export const useWebWallet = () => {
  const authContext = useAuthContext();

  const [loginState, setLoginState] = React.useState({
    isLoading: false,
    isError: false,
  });

  const onLoginSuccess = () => {
    setLoginState({
      isLoading: false,
      isError: false,
    });
  };

  const onLoginError = (e: Error) => {
    authContext!.login({ loginMethod: LoginMethodsEnum.wallet });
    setLoginState({
      isLoading: false,
      isError: true,
    });
  };

  const login = React.useCallback(async () => {
    setLoginState({
      isLoading: true,
      isError: false,
    });
    authContext!.login({ loginMethod: LoginMethodsEnum.wallet });

    const provider = authContext!.providers.wallet;

    try {
      await provider.login();
      onLoginSuccess();
    } catch (e) {
      onLoginError(e as Error);
    }
  }, []);

  return { login, ...loginState };
};
