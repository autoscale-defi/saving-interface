'use client';

import values from 'lodash/values';

import { useTransactionsContext } from '../../providers/Transactions.providers';
export const useTransactions = () => {
  const transactionContext = useTransactionsContext();

  return { transactions: values(transactionContext?.dappTransactions) || [] };
};
