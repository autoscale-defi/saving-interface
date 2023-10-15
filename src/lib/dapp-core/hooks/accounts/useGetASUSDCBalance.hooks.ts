import { useQuery } from '@tanstack/react-query';
import { getASUSDCBalance } from '@/lib/dapp-core/services/accounts.services';
import { useAccount } from '@/lib/dapp-core';
import { toReadableNumber } from '@/lib/amount';
import { isNil } from 'lodash';

export const useGetASUSDCBalance = () => {
  const account = useAccount();

  const { data, isLoading } = useQuery(
    ['asusdc-balance', account?.address],
    () => getASUSDCBalance(account?.address || ''),
    { enabled: Boolean(account?.address) }
  );

  if (!account?.address) return 0;

  if (isLoading) return undefined;

  if (isNil(data)) return 0;
  return toReadableNumber({
    amount: data.balance,
    decimals: data.decimals,
  }).toNumber();
};

export const useGetASUSDCToken = () => {
  const account = useAccount();

  const { data, isLoading } = useQuery(
    ['asusdc-balance', account?.address],
    () => getASUSDCBalance(account?.address || ''),
    { enabled: Boolean(account?.address) }
  );

  if (!account?.address) return 0;

  if (isLoading) return undefined;

  return data;
};
