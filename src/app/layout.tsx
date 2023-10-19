import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProviders } from '@/providers/app.provider';
import { NavBar } from '@/app/_components/nav-bar.component';
import { TransactionToastList } from '@/components/TransactionsToast/TransactionToastList';
import { Footer } from '@/app/_components/footer.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Savings by Autoscale',
  description: 'Decentralized savings account',
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
          <div className="flex h-[100vh] w-full flex-col items-center justify-center">
            <div className="h-full w-full px-4 py-3 lg:mx-12 lg:max-w-6xl">
              <NavBar />

              <div className="space-y-8 py-12">{children}</div>
            </div>
            <Footer />
          </div>
          <TransactionToastList />
        </AppProviders>
      </body>
    </html>
  );
}
