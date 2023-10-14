import { useQuery } from '@tanstack/react-query';
import { getUSDCBalance } from '@/lib/dapp-core/services/accounts.services';
import { useAccount } from '@/lib/dapp-core';
import { toReadableNumber } from '@/lib/amount';
import { isNil } from 'lodash';

export const useGetUSDCBalance = () => {
  const accounts = useAccount();
  const { data } = useQuery(
    ['usdc-balance'],
    () => getUSDCBalance(accounts?.address || ''),
    { enabled: !!accounts?.address }
  );

  if (isNil(data)) return undefined;

  return toReadableNumber({
    amount: data.balance,
    decimals: data.decimals,
  }).toNumber();
};
