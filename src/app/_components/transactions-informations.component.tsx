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
import { List, RefreshCcw, AlertTriangleIcon, Check } from 'lucide-react';
import * as React from 'react';
import { useClearTransactions, useTransactions } from '@/lib/dapp-core';

export function TransactionsInformations() {
  const { clearAllTransactions } = useClearTransactions();
  const { transactions } = useTransactions();

  const hasTransactions = transactions.length > 0;

  function getTransactionsIcon() {
    if (transactions.some((transaction) => transaction.status === 'pending')) {
      return (
        <div className="absolute -right-1 -top-1 rounded-full bg-primary p-1">
          <RefreshCcw className="rotate h-[0.5rem] w-[0.5rem] animate-spin"></RefreshCcw>
        </div>
      );
    }

    if (transactions.some((transaction) => transaction.status === 'fail')) {
      return (
        <div className="absolute -right-1 -top-1 rounded-full bg-destructive p-1">
          <AlertTriangleIcon className="rotate h-[0.5rem] w-[0.5rem]"></AlertTriangleIcon>
        </div>
      );
    }

    if (transactions.some((transaction) => transaction.status === 'success')) {
      return (
        <div className="absolute -right-1 -top-1 rounded-full bg-accent p-1">
          <Check className="rotate h-[0.5rem] w-[0.5rem]"></Check>
        </div>
      );
    }

    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Button variant="outline" size="icon">
            <List className="h-[1.2rem] w-[1.2rem]" />
            {getTransactionsIcon()}
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Transactions</SheetTitle>
        </SheetHeader>

        <div className={'my-8 space-y-4'}>
          {!hasTransactions && (
            <p className="text-muted-foreground">You have no transactions</p>
          )}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            {hasTransactions && (
              <Button onClick={clearAllTransactions} variant="destructive">
                Clear transactions
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
