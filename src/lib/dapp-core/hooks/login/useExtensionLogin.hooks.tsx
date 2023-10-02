import { useState } from "react";

import { useAuthContext } from "../../providers/Authentification.providers";
import * as accountsService from "../../services/accounts.services";
import { useDappCoreContext } from "../../providers/DappCore.providers";
import { LoginMethodsEnum } from "../../types/login.types";

export const useExtensionLogin = () => {
  const authContext = useAuthContext();
  const dappCoreContext = useDappCoreContext();
  const [error, setError] = useState("");

  async function initiateLogin() {
    const provider = authContext!.providers.extension;

    try {
      await provider.init();

      await provider.login();

      const { address } = provider.account;

      const account = await accountsService.getAccount(
        dappCoreContext!.networkConfig.apiAddress,
        address
      );

      authContext?.login({
        account,
        loginMethod: LoginMethodsEnum.extension,
      });
    } catch (error) {
      console.error("error loging in", error);
      setError("error logging in" + (error as any).message);
    }
  }

  return {
    initiateLogin,
    error,
  };
};
