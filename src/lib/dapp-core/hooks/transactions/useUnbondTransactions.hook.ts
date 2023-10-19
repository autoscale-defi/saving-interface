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
import BigNumber from 'bignumber.js';

const GAS_LIMIT = 500000000;

function getUnbondTransactions(address?: string, asuusdc?: any) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });
  console.log(asuusdc);
  return contract.methods
    .unbond()
    .withSingleESDTNFTTransfer(
      TokenTransfer.metaEsdtFromAmount(
        asuusdc.collection,
        asuusdc.nonce,
        BigNumber(asuusdc.balance / 10 ** asuusdc.decimals),
        asuusdc.decimals
      )
    )
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}

export function useUnbondTransactions({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();

  return (asuusdc: any) =>
    sendTransaction({
      transaction: getUnbondTransactions(address, asuusdc),
      sessionInformations: { action: 'unbound' },
    });
}
