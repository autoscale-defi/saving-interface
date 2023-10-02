import * as React from "react";
import keyBy from "lodash/keyBy";
import filter from "lodash/filter";
import useLocalStorageState from "use-local-storage-state";

import { useInterval } from "../hooks/global/useInterval.hooks";
import { getTransactionsStatusByHashes } from "../services/transactions.services";

import { useDappCoreContext } from "./DappCore.providers";

export enum Status {
  FAILED = "fail",
  SUCCESS = "success",
  SENT = "pending",
  CANCELLED = "cancelled",
}

export type DappTransaction = {
  nonce: number;
  sessionId: string;
  sessionInformations?: Record<string, any>;
  status: Status;
  txHash: string;
};

const TransactionsContext = React.createContext<{
  dappTransactions: Record<string, DappTransaction>;
  addDappTransaction(dappTransaction: DappTransaction): void;
  addDappTransactions(dappTransactions: DappTransaction[]): void;
  clearAllTransactions(): void;
} | null>(null);

export const useTransactionsContext = () =>
  React.useContext(TransactionsContext);

export const TransactionsProviders = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const dappCoreContext = useDappCoreContext();
  const [dappTransactions, setDappTransactions] = useLocalStorageState<
    Record<string, DappTransaction>
  >("@autoscale/dappTransactions", {
    defaultValue: {},
  });

  const addDappTransaction = React.useCallback(
    (dappTransaction: DappTransaction) => {
      setDappTransactions((transactions) => ({
        ...transactions,
        [dappTransaction.txHash]: dappTransaction,
      }));
    },
    []
  );

  const addDappTransactions = React.useCallback(
    (dappTransactions: DappTransaction[]) => {
      setDappTransactions((transactions) => ({
        ...transactions,
        ...keyBy(dappTransactions, "txHash"),
      }));
    },
    []
  );

  const clearAllTransactions = React.useCallback(() => {
    setDappTransactions({});
  }, []);

  useInterval(async () => {
    const pendingTransactions = filter(
      dappTransactions,
      (transaction) => transaction.status === "pending"
    );

    if (!pendingTransactions.length) return;

    const pendingTransactionsWithNewStatus = (
      await getTransactionsStatusByHashes(
        dappCoreContext!.networkConfig!.apiAddress,
        pendingTransactions
      )
    ).filter((transaction) => transaction.hasStatusChanged);

    setDappTransactions((transactions) => ({
      ...transactions,
      ...keyBy(pendingTransactionsWithNewStatus, "txHash"),
    }));
  }, 3000);

  return (
    <TransactionsContext.Provider
      value={{
        dappTransactions,
        addDappTransaction,
        addDappTransactions,
        clearAllTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
