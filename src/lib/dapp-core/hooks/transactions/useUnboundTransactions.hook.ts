'use client';
import {
  Address,
  SmartContract,
  TokenPayment,
  TokenTransfer,
} from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount, useSendTransactions } from '@/lib/dapp-core';
import { boolean } from 'zod';

const GAS_LIMIT = 500000000;

function getUnboundTransactions(
  amount: number,
  address?: string,
  asusdc?: any,
  forceUnboundEarly?: boolean
) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  return contract.methods
    .unbound([forceUnboundEarly])
    .withSingleESDTNFTTransfer(
      TokenTransfer.metaEsdtFromAmount(
        asusdc.collection,
        asusdc.nonce,
        amount,
        asusdc.decimals
      )
    )
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}

export function useUnboundTransactions({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();

  return (amount: number, asusdc: any, forceUnboundEarly: boolean) =>
    sendTransaction({
      transaction: getUnboundTransactions(
        amount,
        address,
        asusdc,
        forceUnboundEarly
      ),
      sessionInformations: { action: 'unbound' },
    });
}
