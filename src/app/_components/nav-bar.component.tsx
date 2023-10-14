'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle.component';
import { useAccount } from '@/lib/dapp-core';
import { UserConnectedInformations } from '@/app/_components/user-connected-informations.component';
import { usePathname } from 'next/navigation';
import { DollarSign } from 'lucide-react';
import { DefiWallet } from '@/app/_components/defi-wallet.component';

export function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const account = useAccount();
  const path = usePathname();

  return (
    <nav
      className={cn('flex w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        <div className="rounded-xl bg-primary/30 p-1">
          <DollarSign className="h-5 w-5"></DollarSign>
        </div>

        <Link
          href="/"
          className={`text-md hover:font-medium ${
            path === '/' && 'font-medium'
          }`}
        >
          Analytics
        </Link>

        <Link
          href="/money"
          className={`text-md hover:font-medium ${
            path === '/money' && 'font-medium'
          }`}
        >
          Money
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        {account ? (
          <UserConnectedInformations account={account} />
        ) : (
          <DefiWallet />
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
