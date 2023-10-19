'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle.component';
import { useAccount } from '@/lib/dapp-core';
import { UserConnectedInformations } from '@/app/_components/user-connected-informations.component';
import { usePathname } from 'next/navigation';
import { DollarSign } from 'lucide-react';
import { DefiWallet } from '@/app/_components/defi-wallet.component';
import Image from 'next/image';

export function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const account = useAccount();
  const path = usePathname();

  return (
    <nav
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        <div className="flex flex-row items-center justify-center space-x-2 font-medium">
          <Image src="/ats.svg" alt="ATS logo" width={30} height={30} />
          <span>Savings</span>
        </div>

        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Analytics
          </Link>

          <Link
            href="/money"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Money
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {account ? (
          <UserConnectedInformations account={account} />
        ) : (
          <DefiWallet />
        )}

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
