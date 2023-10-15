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
  const identifier = JSON.parse(process.env.NEXT_PUBLIC_USDC || '{}')
    ?.identifier;

  const tokens = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${address}/tokens`)
    .then((res) => res.data);

  const token = tokens.find((token: any) => token.identifier === identifier);

  return token;
}

export async function getASUSDCBalance(
  address: string
): Promise<{ balance: number; decimals: number; identifier: string }> {
  const collection = JSON.parse(process.env.NEXT_PUBLIC_ASUSDC || '{}')
    ?.identifier;

  const tokens = await axios
    .get(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/${address}/tokens?includeMetaESDT=true`
    )
    .then((res) => res.data);

  const token = tokens.find((token: any) => token.collection === collection);

  return token;
}
