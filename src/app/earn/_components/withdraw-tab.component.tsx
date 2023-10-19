'use client';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { PercentRange } from '@/components/ui/percent-range';
import React from 'react';
import { useAccount, useIsLoggedIn } from '@/lib/dapp-core';
import { SignDialog } from '@/components/sign-dialog.component';
import { DefiWallet } from '@/app/_components/defi-wallet.component';
import {
  useGetASUSDCBalance,
  useGetASUSDCToken,
} from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import { useWithdrawTransactions } from '@/lib/dapp-core/hooks/transactions/useWithdrawTransactions.hook';
import RadioSelect from '@/components/ui/radio-select';
import { Badge } from '@/components/ui/badge';
import { TokenForm } from '@/components/ui/token-input';

export function WithdrawTab() {
  const balance = useGetASUSDCBalance();
  const asusdcToken = useGetASUSDCToken();
  const asusdcBalance = useGetASUSDCBalance();
  const account = useAccount();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const isLoggedIn = useIsLoggedIn();
  const [forceUnboundEarly, setForceUnbondEarly] = React.useState(false);

  const sendWithdrawTransactions = useWithdrawTransactions({
    address: account?.address,
  });
  const [amount, setAmount] = React.useState('0');

  const handleWithdraw = React.useCallback(() => {
    const { signTransaction, sessionId } = sendWithdrawTransactions(
      Number(amount),
      asusdcToken,
      forceUnboundEarly
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

      <CardContent className="my-8">
        <div className="space-y-12">
          <div className="flex flex-col">
            <TokenForm
              title="Amount"
              balance={asusdcBalance || 0}
              amount={amount}
              onUpdateAmount={(value) => setAmount(value || '0')}
            />

            <div className="w-full px-2">
              <PercentRange percent={currentPercent} onChange={setPercent} />
            </div>
          </div>
          <RadioSelect>
            <RadioSelect.Item
              isSelected={!forceUnboundEarly}
              onSelect={() => setForceUnbondEarly(false)}
              title={
                <div className={'flex flex-row items-center space-x-2'}>
                  <Badge variant="blue">
                    <span className="font-semibold">Recommended</span>
                  </Badge>
                  <span>I get my tokens in 10 days </span>
                </div>
              }
              description="Get back your tokens in 10 days without any fees. Note that an action is required, they will not arrive automatically."
            />
            <RadioSelect.Item
              isSelected={forceUnboundEarly}
              onSelect={() => setForceUnbondEarly(true)}
              title=" I need my tokens immediately"
              description={
                <span>
                  Receive your tokens immediately, but please note that there
                  will be a{' '}
                  <span className="font-bold text-primary">7.5% fee</span>{' '}
                  deducted from the amount.
                </span>
              }
            />
          </RadioSelect>

          {isLoggedIn ? (
            <Button className="w-full" onClick={handleWithdraw}>
              Withdraw USDC
            </Button>
          ) : (
            <DefiWallet buttonClassName="w-full" onLogin={handleWithdraw} />
          )}
        </div>
      </CardContent>
    </>
  );
}
