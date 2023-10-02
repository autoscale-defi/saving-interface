import axios from "axios";

import { Account } from "../types/accounts.types";

export async function getAccount(apiAddress: string, address: string) {
  return axios
    .get<Account>(`${apiAddress}/accounts/${address}`)
    .then((res) => res.data);
}
