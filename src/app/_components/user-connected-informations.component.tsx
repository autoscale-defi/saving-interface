import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Account } from '@/lib/dapp-core/types/accounts.types';
import { useLogout } from '@/lib/dapp-core';
import * as React from 'react';
import { User } from 'lucide-react';

type Props = {
  account: Account;
};

function formatAddress(address: string, number: number) {
  if (!address) return '';
  return `${address.substring(0, number)}...${address.substring(
    address.length - number
  )}`;
}

export function UserConnectedInformations(props: Props) {
  const logout = useLogout();

  const address = props.account.address;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className={'space-x-4 '}>
          <User className={'h-5 w-5'} />
          <span className="text-sm">{formatAddress(address, 5)}</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your account</SheetTitle>
        </SheetHeader>
        <div className={'my-8 space-y-4'}>
          <div>
            <p>Wallet address:</p>
            <p className={'text-muted-foreground'}>
              {formatAddress(address, 15)}
            </p>
          </div>
          <div>
            <p>Current shard:</p>
            <p className={'text-muted-foreground'}>{props.account.shard}</p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
