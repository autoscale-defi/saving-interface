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
import { useGetCurrentBlock } from '@/lib/dapp-core/hooks/blockchain/useGetCurrentBlock.hooks';

export function UnboundCard() {
  const account = useAccount();
  const asuusdc = useGetASUUSDCToken();
  console.log(asuusdc);
  const currentBlock = useGetCurrentBlock();
  console.log(currentBlock);
  const claim = useClaimTransaction({ address: account?.address });
  const [sessionId, setSessionId] = useState<string | null>(null);

  function calculateProgress(token: any, currentBlock: any) {
    let blockToWait = token.attributes - currentBlock.epoch;
    if (blockToWait < 0) {
      blockToWait = 0;
    } else if (blockToWait > 7) {
      blockToWait = 7;
    }
    const progression = 100 - (blockToWait / 7) * 100;
    return progression;
  }

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
                {calculateProgress(token, currentBlock) === 100 ? (
                  <Button size="sm" disabled={Boolean(sessionId)}>
                    Claim
                  </Button>
                ) : null}
              </div>
              <Progress
                value={calculateProgress(token, currentBlock)}
                className="w-full"
              />
              <hr className={index === array.length - 1 ? 'hidden' : ''}></hr>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
