'use client';
import {
  Address,
  SmartContract,
  TokenPayment,
  TokenTransfer,
} from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount, useSendTransactions } from '@/lib/dapp-core';
import BigNumber from 'bignumber.js';

const GAS_LIMIT = 50000000;

function getDepositTransactions(
  amount: number,
  address?: string,
  asusdc?: any
) {
  if (!address) {
    throw new Error('address is required');
  }
  console.log('asusdc', asusdc);
  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  const usdc = JSON.parse(process.env.NEXT_PUBLIC_USDC || '{}');

  let tokenTransferArray = [
    TokenTransfer.fungibleFromAmount(usdc.identifier, amount, usdc.decimals),
  ];
  if (asusdc.balance > 0) {
    tokenTransferArray.push(
      TokenTransfer.metaEsdtFromAmount(
        asusdc.collection,
        asusdc.nonce,
        asusdc.balance / 10 ** asusdc.decimals,
        asusdc.decimals
      )
    );
  }

  return contract.methods
    .deposit()
    .withMultiESDTNFTTransfer(tokenTransferArray)
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}

export function useDepositTransactions({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();

  return (amount: number, asusdcToken: any) =>
    sendTransaction({
      transaction: getDepositTransactions(amount, address, asusdcToken),
      sessionInformations: { action: 'deposit' },
    });
}
