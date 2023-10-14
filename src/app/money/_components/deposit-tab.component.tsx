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
import { NumericalInput } from '@/components/numerical-input.component';

export function DepositTab() {
  const balance = useGetUSDCBalance();
  const account = useAccount();
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  const sendDepositTransactions = useDepositTransactions({
    address: account?.address,
  });
  const [amount, setAmount] = React.useState('0');

  const handleDeposit = React.useCallback(() => {
    const { signTransaction, sessionId } = sendDepositTransactions(
      Number(amount)
    );

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
      setAmount((balance * (percent / 100)).toString());
    },
    [balance]
  );

  const currentPercent = React.useMemo(() => {
    if (!balance) return 0;

    return Math.min((Number(amount) / balance) * 100, 100);
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
                <NumericalInput
                  placeholder="Amount"
                  value={amount}
                  onUserInput={(value) => setAmount(value)}
                />
                <Button
                  variant="outline"
                  className="text-xs"
                  onClick={() => setAmount(balance?.toString() || '0')}
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
