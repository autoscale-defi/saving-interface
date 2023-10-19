import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AppProviders } from '@/providers/app.provider';
import { NavBar } from '@/app/_components/nav-bar.component';
import { TransactionToastList } from '@/components/TransactionsToast/TransactionToastList';
import { Footer } from '@/app/_components/footer.component';

const Jarkarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

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
      <body
        className={`flex h-[100vh] flex-col items-center ${Jarkarta.className}`}
      >
        <AppProviders>
          <div className="container max-w-[1184px] space-y-8 p-4 md:p-6">
            <NavBar />

            <main role="main">{children}</main>
          </div>

          <Footer />
          <TransactionToastList />
        </AppProviders>
      </body>
    </html>
  );
}
