import { useQuery } from '@tanstack/react-query';
import { useAccount } from '@/lib/dapp-core';
import { getCurrentBlock } from '../../services/blockchain.services';

export const useGetCurrentBlock = () => {
  const account = useAccount();

  return useQuery(['current-block'], () => getCurrentBlock());
};
