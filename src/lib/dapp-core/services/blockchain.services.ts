import axios from 'axios';

import { Account } from '../types/accounts.types';

export async function getCurrentBlock() {
  return axios
    .get<Account>(`${process.env.NEXT_PUBLIC_API_URL}/blocks/latest`)
    .then((res) => res.data);
}
