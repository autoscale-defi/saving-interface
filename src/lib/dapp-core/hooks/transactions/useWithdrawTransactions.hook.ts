'use client';
import {
  Address,
  SmartContract,
  TokenPayment,
  TokenTransfer,
} from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount, useSendTransactions } from '@/lib/dapp-core';

const GAS_LIMIT = 500000000;

function getWithdrawTransactions(
  amount: number,
  address?: string,
  asusdc?: any
) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  return contract.methods
    .withdraw()
    .withSingleESDTTransfer(
      TokenTransfer.metaEsdtFromAmount(
        asusdc.collection,
        asusdc.nonce,
        asusdc.balance / 10 ** asusdc.decimals,
        asusdc.decimals
      )
    )
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}

export function useWithdrawTransactions({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();

  return (amount: number) =>
    sendTransaction({
      transaction: getWithdrawTransactions(amount, address),
      sessionInformations: { action: 'withdraw' },
    });
}
