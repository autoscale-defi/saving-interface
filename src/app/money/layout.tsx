'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { formatUSDAmount } from '@/lib/amount';
import { Placeholder } from '@/components/ui/placeholder';
import { isNil } from 'lodash';
import { useClaimAmount } from '@/lib/dapp-core/hooks/transactions/useClaimTransactions.hooks';
import { ClaimCard } from '@/app/_components/claim-card.component';
import { useGetASUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import React from 'react';
import { UnboundCard } from '../_components/unbound-card.componen';

export default function Layout({ children }: { children: React.ReactNode }) {
  const USDCBalance = useGetUSDCBalance();
  const AUSDCBalance = useGetASUSDCBalance();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">Money</h2>

      <div className="flex flex-col justify-end gap-12 md:flex-row-reverse">
        <div className="flex flex-col gap-4">
          <ClaimCard />

          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium">My USDC</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-md font-bold">
                {!isNil(USDCBalance) ? (
                  formatUSDAmount(USDCBalance)
                ) : (
                  <Placeholder />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium">
                My USDC deposit
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-md font-bold">
                {!isNil(USDCBalance) ? (
                  formatUSDAmount(AUSDCBalance)
                ) : (
                  <Placeholder />
                )}
              </div>
            </CardContent>
          </Card>

          <UnboundCard />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
