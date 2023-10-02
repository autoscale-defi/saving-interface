import { useTransactionsContext } from "../../providers/Transactions.providers";
export const useClearTransactions = () => {
  const transactionContext = useTransactionsContext();

  return { clearAllTransactions: transactionContext!.clearAllTransactions };
};
