import { useQuery } from '@tanstack/react-query';
import { useAccount } from '@/lib/dapp-core';
import { getCurrentBlock } from '../../services/blockchain.services';

export const useGetCurrentBlock = () => {
  const account = useAccount();

  const { data, isLoading } = useQuery(['current-block'], () =>
    getCurrentBlock()
  );

  if (isLoading) return undefined;

  return data;
};
