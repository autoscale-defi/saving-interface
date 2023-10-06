import axios from 'axios';
import { IPlainTransactionObject } from '@multiversx/sdk-core';

import { DappTransaction } from '../providers/Transactions.providers';

export async function sendSignedTransaction(
  apiAddress: string,
  signedTransaction: IPlainTransactionObject
): Promise<string> {
  return axios
    .post(`${apiAddress}/transactions`, signedTransaction)
    .then((res) => res.data.txHash);
}

export async function getTransactionsStatusByHashes(
  apiAddress: string,
  pendingTransactions: DappTransaction[]
): Promise<(DappTransaction & { hasStatusChanged: boolean })[]> {
  const { data: responseData } = await axios.get(`${apiAddress}/transactions`, {
    params: {
      hashes: pendingTransactions.map((tx) => tx.txHash).join(','),
      withScResults: true,
    },
  });

  return pendingTransactions.map((pendingTransaction) => {
    const txOnNetwork =
      responseData.find(
        (txResponse: any) => txResponse?.txHash === pendingTransaction.txHash
      ) || 'pending';

    return {
      ...pendingTransaction,
      status: txOnNetwork.status,
      hasStatusChanged: txOnNetwork.status !== pendingTransaction.status,
    };
  });
}
