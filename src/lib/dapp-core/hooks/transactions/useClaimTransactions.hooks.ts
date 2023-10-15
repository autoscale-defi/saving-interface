import {
  Address,
  BinaryCodec,
  FieldDefinition,
  ResultsParser,
  SmartContract,
  StructType,
} from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount } from '@/lib/dapp-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { useGetASUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import { useQuery } from '@tanstack/react-query';
import { BigUIntType } from '@multiversx/sdk-core/out/smartcontracts/typesystem/numerical';
import { toReadableNumber } from '@/lib/amount';

async function getClaimAmount(address?: string, ausdcToken?: any) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  const [decoded] = new BinaryCodec().decodeNested(
    Buffer.from(ausdcToken.attributes, 'base64'),
    new StructType('SavingsTokenAttributes', [
      new FieldDefinition('initial_rewards_per_share', '', new BigUIntType()),
      new FieldDefinition('accumulated_rewards', '', new BigUIntType()),
      new FieldDefinition('total_shares', '', new BigUIntType()),
    ])
  );

  const interaction = contract.methods.calculateRewardsForGivenPosition([
    ausdcToken.balance,
    decoded.valueOf(),
  ]);

  const queryResponse = await new ApiNetworkProvider(
    process.env.NEXT_PUBLIC_API_URL || ''
  ).queryContract(interaction.check().buildQuery());

  const response = new ResultsParser().parseQueryResponse(
    queryResponse,
    interaction.getEndpoint()
  );

  const amount = response.values[0].valueOf();

  return toReadableNumber({ amount, decimals: 6 }).toNumber();
}

export function useClaimAmount() {
  const address = useAccount()?.address;
  const ausdcToken = useGetASUSDCToken();

  return useQuery(
    ['claim-amount', address],
    () => getClaimAmount(address, ausdcToken),
    { enabled: Boolean(address) && Boolean(ausdcToken) }
  );
}
