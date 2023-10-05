'use client';

import { useDappCoreContext } from '../../providers/DappCore.providers';

export const useNetwork = () => {
  const dappCoreContext = useDappCoreContext();

  return dappCoreContext?.networkConfig;
};
