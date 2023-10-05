'use client';
import * as React from 'react';

import { Network } from '../types/network.types';

import { AuthentificationProvider } from './Authentification.providers';
import { TransactionsProviders } from './Transactions.providers';

const DappCoreContext = React.createContext<{ networkConfig: Network } | null>(
  null
);

export const useDappCoreContext = () => React.useContext(DappCoreContext);

export const DappCoreProvider = ({
  children,
  networkConfig,
}: React.PropsWithChildren<{ networkConfig: Network }>) => {
  return (
    <DappCoreContext.Provider value={{ networkConfig }}>
      <TransactionsProviders>
        <AuthentificationProvider>{children}</AuthentificationProvider>
      </TransactionsProviders>
    </DappCoreContext.Provider>
  );
};
