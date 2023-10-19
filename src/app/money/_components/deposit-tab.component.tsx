'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PercentRange } from '@/components/ui/percent-range';
import React from 'react';
import { useDepositTransactions } from '@/lib/dapp-core/hooks/transactions/useDepositTransactions.hooks';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { useAccount, useIsLoggedIn } from '@/lib/dapp-core';
import { SignDialog } from '@/components/sign-dialog.component';
import { DefiWallet } from '@/app/_components/defi-wallet.component';
import { useGetASUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import { TokenForm } from '@/components/ui/token-input';

export function DepositTab() {
  const usdcBalance = useGetUSDCBalance();
  const asusdcToken = useGetASUSDCToken();
  const account = useAccount();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const isLoggedIn = useIsLoggedIn();

  const sendDepositTransactions = useDepositTransactions({
    address: account?.address,
  });
  const [amount, setAmount] = React.useState('0');

  const handleDeposit = React.useCallback(() => {
    const { signTransaction, sessionId } = sendDepositTransactions(
      Number(amount),
      asusdcToken
    );

    setSessionId(sessionId);

    signTransaction({
      onError() {
        setSessionId(null);
      },
      onSign() {
        setSessionId(null);
        setAmount('0');
      },
    });
  }, [amount, sendDepositTransactions]);

  const setPercent = React.useCallback(
    (percent: number) => {
      if (!usdcBalance) return 0;
      setAmount((usdcBalance * (percent / 100)).toString());
    },
    [usdcBalance]
  );

  const currentPercent = React.useMemo(() => {
    if (!usdcBalance) return 0;

    return Math.min((Number(amount) / usdcBalance) * 100, 100);
  }, [amount, usdcBalance]);

  return (
    <>
      <SignDialog
        open={Boolean(sessionId)}
        setOpen={() => setSessionId(null)}
      />
      <CardHeader>
        <CardDescription>
          Deposit your USDC and earn <span className="font-bold">6% APY</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <TokenForm
              title="Amount"
              balance={usdcBalance || 0}
              amount={amount}
              onUpdateAmount={(value) => setAmount(value || '0')}
            />

            <div className="px-2">
              <PercentRange percent={currentPercent} onChange={setPercent} />
            </div>
          </div>

          {isLoggedIn ? (
            <Button className="w-full" onClick={handleDeposit}>
              Deposit USDC
            </Button>
          ) : (
            <DefiWallet buttonClassName="w-full" onLogin={handleDeposit} />
          )}
        </div>
      </CardContent>
    </>
  );
}
