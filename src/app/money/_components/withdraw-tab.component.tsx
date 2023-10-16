'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PercentRange } from '@/components/ui/percent-range';
import React from 'react';
import { useDepositTransactions } from '@/lib/dapp-core/hooks/transactions/useDepositTransactions.hooks';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { useAccount, useIsLoggedIn } from '@/lib/dapp-core';
import { SignDialog } from '@/components/sign-dialog.component';
import { NumericalInput } from '@/components/numerical-input.component';
import { DefiWallet } from '@/app/_components/defi-wallet.component';
import { useGetASUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import { useWithdrawTransactions } from '@/lib/dapp-core/hooks/transactions/useWithdrawTransactions.hook';

export function WithdrawTab() {
  const balance = useGetASUSDCBalance();
  const account = useAccount();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const isLoggedIn = useIsLoggedIn();

  const sendWithdrawTransactions = useWithdrawTransactions({
    address: account?.address,
  });
  const [amount, setAmount] = React.useState('0');

  const handleWithdraw = React.useCallback(() => {
    const { signTransaction, sessionId } = sendWithdrawTransactions(
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
  }, [amount, sendWithdrawTransactions]);

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
          <CardTitle>Withdraw</CardTitle>
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

            {isLoggedIn ? (
              <Button className="w-full" onClick={handleWithdraw}>
                Withdraw USDC
              </Button>
            ) : (
              <DefiWallet buttonClassName="w-full" onLogin={handleWithdraw} />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
