'use client';

import { useAuthContext } from '../../providers/Authentification.providers';

export const useAccount = () => {
  const authContext = useAuthContext();

  return authContext?.account;
};
