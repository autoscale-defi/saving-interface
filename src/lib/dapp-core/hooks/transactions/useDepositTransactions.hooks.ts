'use client';
import { Address, SmartContract, TokenPayment } from '@multiversx/sdk-core/out';
import { getControllerAbi } from '@/lib/dapp-core/abi/controller.abi';
import { useAccount, useSendTransactions } from '@/lib/dapp-core';

const GAS_LIMIT = 500000000;

function getDepositTransactions(amount: number, address?: string) {
  if (!address) {
    throw new Error('address is required');
  }

  const contract = new SmartContract({
    address: new Address(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
    abi: getControllerAbi(),
  });

  const usdc = JSON.parse(process.env.NEXT_PUBLIC_USDC || '{}');

  return contract.methods
    .deposit()
    .withSingleESDTTransfer(
      TokenPayment.fungibleFromAmount(usdc.identifier, amount, usdc.decimals)
    )
    .withGasLimit(GAS_LIMIT)
    .withSender(new Address(address))
    .check()
    .buildTransaction();
}

export function useDepositTransactions({ address }: { address?: string }) {
  const { sendTransaction } = useSendTransactions();

  return (amount: number) =>
    sendTransaction({
      transaction: getDepositTransactions(amount, address),
      sessionInformations: { action: 'deposit' },
    });
}
