import {
  Address,
  BinaryCodec,
  FieldDefinition,
  ResultsParser,
  SmartContract,
  StructType,
  TokenTransfer,
} from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount, useSendTransactions } from '@/lib/dapp-core';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import { useGetASUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUSDCBalance.hooks';
import { useQuery } from '@tanstack/react-query';
import { BigUIntType } from '@multiversx/sdk-core/out/smartcontracts/typesystem/numerical';
import { toReadableNumber } from '@/lib/amount';

const GAS_LIMIT = 500000000;

async function getClaimAmount(address?: string, ausdcToken?: any) {
  if (!address || !ausdcToken) {
    return 0;
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

function getClaimTransaction(address?: string, ausdcToken?: any) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  return contract.methods
    .claimRewards()
    .withMultiESDTNFTTransfer([
      TokenTransfer.metaEsdtFromAmount(
        ausdcToken.collection,
        ausdcToken.nonce,
        ausdcToken.balance / 10 ** ausdcToken.decimals,
        ausdcToken.decimals
      ),
    ])
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}
export function useClaimAmount() {
  const address = useAccount()?.address;
  const ausdcToken = useGetASUSDCToken();

  return useQuery(['claim-amount', address, ausdcToken?.balance], () =>
    getClaimAmount(address, ausdcToken)
  );
}

export function useClaimTransaction({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();
  const ausdcToken = useGetASUSDCToken();

  return () =>
    sendTransaction({
      transaction: getClaimTransaction(address, ausdcToken),
      sessionInformations: { action: 'claim' },
    });
}
