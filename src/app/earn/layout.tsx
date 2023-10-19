'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { formatUSDAmount } from '@/lib/amount';
import { Placeholder } from '@/components/ui/placeholder';
import { ClaimCard } from '@/app/_components/claim-card.component';
import { useGetASUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import React from 'react';
import Link from 'next/link';
import { AreaChart } from 'lucide-react';
import { isNil } from 'lodash';
export default function Layout({ children }: { children: React.ReactNode }) {
  const USDCBalance = useGetUSDCBalance();
  const AUSDCBalance = useGetASUSDCBalance();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-row justify-between rounded-sm border-2 border-card py-4 pl-8 pr-4">
            <div className="flex flex-row space-x-6">
              <div className="text-md flex flex-col border-r pr-6 font-bold">
                <span className="text-sm text-muted-foreground">
                  Total value locked
                </span>
                <span>435,342$</span>
              </div>
              <div className="text-md flex flex-col font-bold">
                <span className="text-sm text-muted-foreground">Fixed APR</span>
                <span>6%</span>
              </div>
            </div>

            <Link href="/">
              <Button variant="outline" className="space-x-2">
                <span>See analytics</span> <AreaChart className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div>{children}</div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-1 flex-row items-center justify-between gap-4 rounded-lg border bg-card px-4 py-9 text-card-foreground shadow-sm dark:border-0 md:flex-col md:justify-center">
              <div className="flex flex-col space-y-2 border-r pb-4 md:border-b md:border-r-0">
                <span
                  className={'text-xs font-medium leading-none tracking-tight'}
                >
                  My USDC deposit
                </span>
                <span className="text-md font-bold">
                  {!isNil(USDCBalance) ? (
                    formatUSDAmount(AUSDCBalance)
                  ) : (
                    <Placeholder />
                  )}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <span
                  className={'text-xs font-medium leading-none tracking-tight'}
                >
                  Monthly rewards
                </span>
                <span className="text-md font-bold">
                  {!isNil(USDCBalance) ? (
                    formatUSDAmount(((AUSDCBalance || 0) * 0.06) / 12)
                  ) : (
                    <Placeholder />
                  )}
                </span>
              </div>
            </div>

            <ClaimCard />
          </div>
        </div>
      </div>
    </div>
  );
}
