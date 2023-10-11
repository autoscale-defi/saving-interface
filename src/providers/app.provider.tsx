'use client';
import { DappCoreProvider } from '@/lib/dapp-core';
import { ThemeProvider } from '@/providers/theme.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <DappCoreProvider
      networkConfig={JSON.parse(process.env.NEXT_PUBLIC_NETWORK_CONFIG || '{}')}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </DappCoreProvider>
  );
};
