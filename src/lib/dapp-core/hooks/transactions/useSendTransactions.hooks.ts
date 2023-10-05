'use client';

import * as React from 'react';
import { Transaction } from '@multiversx/sdk-core';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';

import { useAuthContext } from '../../providers/Authentification.providers';
import { useDappCoreContext } from '../../providers/DappCore.providers';
import { sendSignedTransaction } from '../../services/transactions.services';
import {
  Status,
  useTransactionsContext,
} from '../../providers/Transactions.providers';
import * as accountsService from '../../services/accounts.services';

export function useSendTransactions() {
  const authContext = useAuthContext();
  const dappCoreContext = useDappCoreContext();
  const transactionContext = useTransactionsContext();

  const sendTransaction = React.useCallback(
    ({
      transaction,
      sessionInformations,
    }: {
      transaction: Transaction;
      sessionInformations?: Record<string, any>;
    }) => {
      const sessionId = Date.now().toString();

      const signTransaction = async ({
        onError,
        onSign,
      }: {
        onError(error: any): void;
        onSign(): void;
      }) => {
        if (!authContext!.loginMethod) {
          throw new Error('No login method');
        }

        const provider = authContext!.providers[authContext!.loginMethod];

        if ('init' in provider) {
          await provider.init();
        }

        if (provider instanceof WalletProvider) {
          sessionStorage.setItem(
            '@autoscale/pendingTransactionsContext',
            JSON.stringify({
              sessionInformations,
              sessionId,
            })
          );
        }

        const account = await accountsService.getAccount(
          dappCoreContext!.networkConfig.apiAddress,
          authContext?.account?.address || ''
        );

        transaction.setNonce(account.nonce);
        transaction.setChainID(dappCoreContext!.networkConfig.chainId);

        try {
          // @ts-ignore
          const signedTransaction = await provider.signTransaction(transaction);

          if (signedTransaction) {
            const txHash = await sendSignedTransaction(
              dappCoreContext!.networkConfig.apiAddress,
              signedTransaction.toPlainObject()
            );

            transactionContext!.addDappTransaction({
              ...signedTransaction.toPlainObject(),
              sessionInformations,
              sessionId,
              status: Status.SENT,
              txHash,
            });
            return onSign();
          }

          console.error('Transaction not signed');
          onError(new Error('Transaction not signed'));
        } catch (error) {
          console.error(error);
          onError(error);
        }
      };

      return {
        sessionId,
        signTransaction,
      };
    },
    [authContext, transactionContext, dappCoreContext]
  );

  const sendTransactions = React.useCallback(
    ({
      transactions,
      sessionInformations,
    }: {
      transactions: Transaction[];
      sessionInformations?: Record<string, any> | Record<string, any>[];
    }) => {
      const sessionId = Date.now().toString();

      const signTransactions = async ({
        onError,
        onSign,
      }: {
        onError(error: any): void;
        onSign(): void;
      }) => {
        if (!authContext!.loginMethod) {
          throw new Error('No login method');
        }

        const provider = authContext!.providers[authContext!.loginMethod];

        if ('init' in provider) {
          await provider.init();
        }

        if (provider instanceof WalletProvider) {
          sessionStorage.setItem(
            '@autoscale/pendingTransactionsContext',
            JSON.stringify({ sessionInformations, sessionId })
          );
        }

        const account = await accountsService.getAccount(
          dappCoreContext!.networkConfig.apiAddress,
          authContext?.account?.address || ''
        );

        transactions.forEach((transaction, index) => {
          transaction.setNonce(account.nonce + index);
          transaction.setChainID(dappCoreContext!.networkConfig.chainId);
        });

        try {
          // @ts-ignore
          const signedTransactions =
            await provider.signTransactions(transactions);

          if (signedTransactions) {
            await Promise.all([
              signedTransactions.map(
                async (transaction: any, index: number) => {
                  const txHash = await sendSignedTransaction(
                    dappCoreContext!.networkConfig.apiAddress,
                    transaction.toPlainObject()
                  );

                  const sessionInformationsForTransaction = Array.isArray(
                    sessionInformations
                  )
                    ? sessionInformations[index]
                    : sessionInformations;

                  transactionContext!.addDappTransaction({
                    ...transaction.toPlainObject(),
                    sessionInformations: sessionInformationsForTransaction,
                    sessionId,
                    status: Status.SENT,
                    txHash,
                  });
                }
              ),
            ]);

            return onSign();
          }
        } catch (error) {
          onError(error);
        }
      };

      return {
        sessionId,
        signTransactions,
      };
    },
    [authContext, transactionContext, dappCoreContext]
  );

  return { sendTransaction, sendTransactions };
}
