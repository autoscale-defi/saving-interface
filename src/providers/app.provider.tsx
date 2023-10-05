'use client';
import { DappCoreProvider } from '@/lib/dapp-core';
import { ThemeProvider } from '@/providers/theme.provider';

export const AppProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <DappCoreProvider
      networkConfig={JSON.parse(process.env.NEXT_PUBLIC_NETWORK_CONFIG || '{}')}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </DappCoreProvider>
  );
};
