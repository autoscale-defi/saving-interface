import { useAccount } from '@/lib/dapp-core';
import React, { useState } from 'react';
import { useGetASUUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUUSDCBalance.hook';
import { useGetCurrentBlock } from '@/lib/dapp-core/hooks/blockchain/useGetCurrentBlock.hooks';
import { useUnbondTransactions } from '@/lib/dapp-core/hooks/transactions/useUnbondTransactions.hook';
import UnbondLine from '@/app/earn/_components/unbond-line.component';

export function UnbondCard() {
  const account = useAccount();
  const asuusdc = useGetASUUSDCToken();
  const { data: currentBlock, isLoading: blockIsLoading } =
    useGetCurrentBlock();
  const sendUnbondTransactions = useUnbondTransactions({
    address: account?.address,
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleUnbond = React.useCallback(
    (token: any) => {
      const { signTransaction, sessionId } = sendUnbondTransactions(token);

      setSessionId(sessionId);

      signTransaction({
        onError() {
          setSessionId(null);
        },
        onSign() {
          setSessionId(null);
        },
      });
    },
    [sendUnbondTransactions]
  );

  function caculateTimestamp(token: any, currentBlock: any) {
    const epochToWait = token.attributes - currentBlock.epoch;

    if (epochToWait < 0) {
      return new Date().getTime();
    }
    return new Date().getTime();

    return new Date().getTime() + epochToWait * 2 * 60 * 60 * 1000;
  }

  if (blockIsLoading) {
    return null;
  }

  return asuusdc?.map((token, index, array) => {
    return (
      <UnbondLine
        key={token.identifier}
        assetAmount={token.balance / 10 ** 6}
        priceAmount={token.balance / 10 ** 6}
        timestamp={caculateTimestamp(token, currentBlock)}
        unbond={() => handleUnbond(token)}
      />
    );
  });
}
