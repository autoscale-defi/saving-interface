'use client';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { AnimatePresence } from 'framer-motion';
import { XIcon } from '@heroicons/react/solid';

import { TransactionToast } from './TransactionToast';
import { useClearTransactions } from '@/lib/dapp-core';
import { useTransactionsList } from '@/components/TransactionsToast/useTransactionsList.hook';

export const TransactionToastList = () => {
  const {
    transactions,
    countAllTransactions,
    countTransactionsProcessed,
    shouldShowAllTransactions,
    toggleShowAllTransactions,
    shouldShowMoreButton,
  } = useTransactionsList();
  const { clearAllTransactions } = useClearTransactions();

  if (isEmpty(transactions)) return null;

  return (
    <div className="fixed bottom-0 right-0 z-20 w-full p-4 md:max-w-[400px]">
      <div className="border-light-label/10 space-y-3 rounded-2xl border p-4 shadow-lg">
        <div className="flex flex-row justify-between">
          <span className="text-base font-semibold">Transactions</span>

          <div className="flex flex-row items-center space-x-4">
            <span className="text-light-label text-xs font-medium">
              {countTransactionsProcessed}/{countAllTransactions} processed
            </span>

            <XIcon
              onClick={clearAllTransactions}
              className="text-light-label h-5 w-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-[6px]">
          {isEmpty(transactions) ? (
            <span className="text-sm">No transactions</span>
          ) : (
            <AnimatePresence>
              {transactions.reverse().map((transaction) => (
                <TransactionToast
                  key={transaction.hash}
                  infos={{
                    status: transaction.status,
                    transactionHash: transaction.hash,
                    action: transaction.action,
                  }}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {shouldShowMoreButton && (
          <div
            onClick={toggleShowAllTransactions}
            className="flex cursor-pointer items-center justify-center rounded-md border p-2 text-xs font-semibold opacity-70 hover:opacity-100"
          >
            {shouldShowAllTransactions
              ? 'Hide transactions'
              : 'View all transactions'}
          </div>
        )}
      </div>
    </div>
  );
};
