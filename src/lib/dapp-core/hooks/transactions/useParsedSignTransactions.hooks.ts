import { useEffect } from "react";
import qs from "qs";

import { useDappCoreContext } from "../../providers/DappCore.providers";
import { clearNavigationHistory } from "../../utils/clearNavigationHistory.utils";
import { sendSignedTransaction } from "../../services/transactions.services";
import {
  Status,
  useTransactionsContext,
} from "../../providers/Transactions.providers";
import { Providers } from "../../providers/Authentification.providers";

export function useParseSignedTransactions({
  providers,
}: {
  providers: Providers;
}) {
  const dappCoreContext = useDappCoreContext();
  const transactionsContext = useTransactionsContext();

  useEffect(() => {
    const searchData = qs.parse(window?.location.search.replace("?", ""));

    if (!("walletProviderStatus" in searchData)) return;

    const pendingTransactionsContext = JSON.parse(
      sessionStorage.getItem("@autoscale/pendingTransactionsContext") || "{}"
    );

    sessionStorage.removeItem("@autoscale/pendingTransactionsContext");

    const signedTransactions = providers.wallet.getTransactionsFromWalletUrl();

    clearNavigationHistory();

    if (searchData.status === "cancelled") {
      return;
    }

    if (signedTransactions.length <= 0) return;

    signedTransactions.map(async (transaction, index) => {
      const txHash = await sendSignedTransaction(
        dappCoreContext!.networkConfig.apiAddress,
        {
          ...transaction,
          data: Buffer.from(transaction.data).toString("base64"),
        }
      );

      const sessionInformationsForTransaction = Array.isArray(
        pendingTransactionsContext.sessionInformations
      )
        ? pendingTransactionsContext.sessionInformations[index]
        : pendingTransactionsContext.sessionInformations;

      transactionsContext!.addDappTransaction({
        ...transaction,
        sessionId: pendingTransactionsContext.sessionId,
        sessionInformations: sessionInformationsForTransaction,
        status: Status.SENT,
        txHash,
      });
    });
  }, []);
}
