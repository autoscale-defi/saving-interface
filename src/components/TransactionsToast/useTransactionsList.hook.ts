import React from 'react';
import _ from 'lodash';
import { useTransactions } from '@/lib/dapp-core';

const MAX_TRANSACTIONS = 5;

export const useTransactionsList = () => {
  const [shouldShowAllTransactions, setShouldShowAllTransactions] =
    React.useState(false);
  const { transactions } = useTransactions();

  const notCancelledTransactions = React.useMemo(
    () =>
      _.chain(transactions)
        .map((transaction) => ({
          status: transaction.status,
          hash: transaction.txHash,
          nonce: transaction.nonce,
          action: transaction.sessionInformations?.action,
        }))
        .filter((transaction) => transaction.status !== 'cancelled')
        .sortBy('nonce')
        .reverse()
        .value(),
    [transactions]
  );

  const transactionsToShow = React.useMemo(() => {
    return _.slice(
      notCancelledTransactions,
      0,
      shouldShowAllTransactions ? undefined : MAX_TRANSACTIONS
    );
  }, [shouldShowAllTransactions, notCancelledTransactions]);

  const hasProcessingTransactions = React.useMemo(
    () =>
      notCancelledTransactions.some(
        (transaction) => transaction.status === 'pending'
      ),
    [notCancelledTransactions]
  );

  const countTransactionsProcessed = React.useMemo(() => {
    return _.filter(
      notCancelledTransactions,
      (transaction) => transaction.status !== 'pending'
    ).length;
  }, [notCancelledTransactions]);

  const toggleShowAllTransactions = () =>
    setShouldShowAllTransactions((s) => !s);

  return {
    countAllTransactions: notCancelledTransactions.length,
    countTransactionsProcessed,
    transactions: transactionsToShow,
    hasProcessingTransactions,
    toggleShowAllTransactions,
    shouldShowAllTransactions,
    shouldShowMoreButton: notCancelledTransactions.length > MAX_TRANSACTIONS,
  };
};
