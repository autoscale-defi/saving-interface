import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/providers/app.provider';
import { NavBar } from '@/app/_components/nav-bar.component';
import { TransactionToastList } from '@/components/TransactionsToast/TransactionToastList';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <AppProviders>
          <div className="flex w-full  justify-center">
            <div className="w-full px-4 py-3 lg:mx-12 lg:max-w-6xl">
              <NavBar />

              <div className="py-12">{children}</div>
            </div>
          </div>
          <TransactionToastList />
        </AppProviders>
      </body>
    </html>
  );
}
