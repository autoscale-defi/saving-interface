import { useQuery } from '@tanstack/react-query';
import {
  getASUSDCBalance,
  getASUUSDCBalance,
} from '@/lib/dapp-core/services/accounts.services';
import { useAccount } from '@/lib/dapp-core';
import { toReadableNumber } from '@/lib/amount';
import { isNil } from 'lodash';
import { getControllerAbi } from '../../abi/controller.abi';
import { BinaryCodec, StructType } from '@multiversx/sdk-core/out';

export const useGetASUUSDCBalance = () => {
  const account = useAccount();

  const { data, isLoading } = useQuery(
    ['asuusdc-balance', account?.address],
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

export const useGetASUUSDCToken = (): any[] | undefined => {
  const account = useAccount();

  const { data, isLoading } = useQuery(
    ['asuudc-token', account?.address],
    () => getASUUSDCBalance(account?.address || ''),
    { enabled: Boolean(account?.address) }
  );

  if (isLoading) return undefined;

  const fieldsDefinitions = new StructType(
    'Attributes',
    getControllerAbi().getStruct('UnbondTokenAttributes').getFieldsDefinitions()
  );
  if (data) {
    data.forEach((token) => {
      if (typeof token.attributes === 'string') {
        const [decoded] = new BinaryCodec().decodeNested(
          Buffer.from(token.attributes, 'base64'),
          fieldsDefinitions
        );
        token.attributes = decoded.valueOf().unlock_epoch.toNumber();
      }
    });
  }
  return data ? data : [];
};
