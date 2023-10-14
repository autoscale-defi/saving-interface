'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PercentRange } from '@/components/ui/percent-range';
import React from 'react';
import { useDepositTransactions } from '@/lib/dapp-core/hooks/transactions/useDepositTransactions.hooks';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { useAccount } from '@/lib/dapp-core';
import { SignDialog } from '@/components/sign-dialog.component';

export function DepositTab() {
  const balance = useGetUSDCBalance();
  const account = useAccount();
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  const sendDepositTransactions = useDepositTransactions({
    address: account?.address,
  });
  const [amount, setAmount] = React.useState(0);

  const handleDeposit = React.useCallback(() => {
    const { signTransaction, sessionId } = sendDepositTransactions(amount);

    setSessionId(sessionId);

    signTransaction({
      onError() {
        setSessionId(null);
      },
      onSign() {
        setSessionId(null);
      },
    });
  }, [amount, sendDepositTransactions]);

  const setPercent = React.useCallback(
    (percent: number) => {
      if (!balance) return 0;
      setAmount(balance * (percent / 100));
    },
    [balance]
  );

  const currentPercent = React.useMemo(() => {
    if (!balance) return 0;

    return (amount / balance) * 100;
  }, [amount, balance]);

  return (
    <>
      <SignDialog
        open={Boolean(sessionId)}
        setOpen={() => setSessionId(null)}
      />
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="Amount"
                  value={amount}
                  type={'number'}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => setAmount(balance || 0)}
                >
                  Max
                </Button>
              </div>

              <div className="max-w-[350px] px-2">
                <PercentRange percent={currentPercent} onChange={setPercent} />
              </div>
            </div>

            <Button className="w-full" onClick={handleDeposit}>
              Deposit USDC
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
