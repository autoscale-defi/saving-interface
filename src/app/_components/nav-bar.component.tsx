'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle.component';
import { Button } from '@/components/ui/button';
import { useAccount, useLogout, useWebWallet } from '@/lib/dapp-core';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function NavBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const account = useAccount();
  const { login } = useWebWallet();
  const logout = useLogout();

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
          <div
            onClick={logout}
            className="flex cursor-pointer flex-row items-center space-x-2 hover:text-destructive"
          >
            <Avatar>
              <AvatarImage
                src={`https://id.maiar.com/users/photos/profile/${account?.address}`}
              />
              <AvatarFallback>
                {account.address.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              {`${account.address.substring(
                0,
                5
              )}...${account.address.substring(account.address.length - 5)}`}
            </div>
          </div>
        ) : (
          <Button onClick={login}>Connect Wallet</Button>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
