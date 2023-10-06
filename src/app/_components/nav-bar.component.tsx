'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle.component';
import { Button } from '@/components/ui/button';
import { useAccount, useLogout, useWebWallet } from '@/lib/dapp-core';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserConnectedInformations } from '@/app/_components/user-connected-informations.component';

export function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const account = useAccount();
  const { login } = useWebWallet();

  return (
    <nav
      className={cn('flex w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex space-x-4 lg:space-x-6">
        <Link
          href="/"
          className="text-lg font-medium transition-colors hover:text-primary"
        >
          Saving
        </Link>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        {account ? (
          <UserConnectedInformations account={account} />
        ) : (
          <Button onClick={login}>Connect Wallet</Button>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
