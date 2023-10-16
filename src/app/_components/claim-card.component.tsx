import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isNil } from 'lodash';
import { formatUSDAmount } from '@/lib/amount';
import { Placeholder } from '@/components/ui/placeholder';
import { Button } from '@/components/ui/button';
import {
  useClaimAmount,
  useClaimTransaction,
} from '@/lib/dapp-core/hooks/transactions/useClaimTransactions.hooks';
import { useAccount } from '@/lib/dapp-core';
import React, { useState } from 'react';
import { SignDialog } from '@/components/sign-dialog.component';

export function ClaimCard() {
  const account = useAccount();
  const { data: USDCRewards, isLoading } = useClaimAmount();
  const claim = useClaimTransaction({ address: account?.address });
  const [sessionId, setSessionId] = useState<string | null>(null);

  function handleClaim() {
    const { sessionId, signTransaction } = claim();

    setSessionId(sessionId);

    signTransaction({
      onError() {
        setSessionId(null);
      },
      onSign() {
        setSessionId(null);
      },
    });
  }

  return (
    <>
      <SignDialog
        open={Boolean(sessionId)}
        setOpen={() => setSessionId(null)}
      />
      <Card className={'flew-row flex items-center justify-between'}>
        <div>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium">
              My USDC rewards
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="text-md font-bold">
              {!isLoading ? formatUSDAmount(USDCRewards) : <Placeholder />}
            </div>
          </CardContent>
        </div>

        {Boolean(USDCRewards) && (
          <Button
            size="sm"
            disabled={Boolean(sessionId)}
            onClick={handleClaim}
            className="mr-4"
          >
            Claim
          </Button>
        )}
      </Card>
    </>
  );
}
