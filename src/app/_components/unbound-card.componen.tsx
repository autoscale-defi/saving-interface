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
import { useGetASUUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUUSDCBalance.hook';
import { Progress } from '@/components/ui/progress';

export function UnboundCard() {
  const account = useAccount();
  const asuusdc = useGetASUUSDCToken();
  const claim = useClaimTransaction({ address: account?.address });
  const [sessionId, setSessionId] = useState<string | null>(null);

  return (
    <Card className={'flex flex-col items-center justify-between w-56'}>
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-medium">Unbound</CardTitle>
      </CardHeader>

      <CardContent className="w-full space-y-3 pt-5">
        {asuusdc?.map((token, index, array) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-md font-bold">
                <p>{formatUSDAmount(token.balance / (10 * 6))}</p>
                <Button size="sm" disabled={Boolean(sessionId)}>
                  Claim
                </Button>
              </div>
              <Progress value={40} className="w-full" />
              <hr className={index === array.length - 1 ? 'hidden' : ''}></hr>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
