import axios from 'axios';

import { Account } from '../types/accounts.types';

export async function getAccount(apiAddress: string, address: string) {
  return axios
    .get<Account>(`${apiAddress}/accounts/${address}`)
    .then((res) => res.data);
}

export async function getUSDCBalance(
  address: string
): Promise<{ balance: number; decimals: number }> {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${address}/tokens/USDC-79d9a4`
    )
    .then((res) => res.data);
}
