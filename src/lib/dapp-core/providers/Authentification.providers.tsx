import * as React from "react";
import useLocalStorageState from "use-local-storage-state";
import { WalletProvider } from "@multiversx/sdk-web-wallet-provider";
import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";
import { ExtensionProvider } from "@multiversx/sdk-extension-provider";
import { HWProvider } from "@multiversx/sdk-hw-provider/out";

import * as accountsService from "../services/accounts.services";
import { LoginMethodsEnum } from "../types/login.types";
import { Account } from "../types/accounts.types";
import { clearNavigationHistory } from "../utils/clearNavigationHistory.utils";
import { Network } from "../types/network.types";
import { useParseSignedTransactions } from "../hooks/transactions/useParsedSignTransactions.hooks";

import { useDappCoreContext } from "./DappCore.providers";
import { useTransactionsContext } from "./Transactions.providers";

export function getWebWalletProvider({ network }: { network: Network }) {
  return new WalletProvider(`${network.walletAddress}/dapp/init`);
}

export function getWalletConnectProvider({
  network,
  handleOnLogin = () => {},
  handleOnLogout = () => {},
  handleOnEvent = () => {},
}: {
  network: Network;
  handleOnLogin?: () => void;
  handleOnLogout?: () => void;
  handleOnEvent?: (events: any) => void;
}) {
  return new WalletConnectV2Provider(
    {
      onClientLogin: handleOnLogin,
      onClientLogout: handleOnLogout,
      onClientEvent: handleOnEvent,
    },
    network!.chainId,
    network!.walletConnectRelayAddress,
    network!.walletConnectProjectId
  );
}

export type Providers = {
  wallet: WalletProvider;
  walletconnect: WalletConnectV2Provider;
  extension: ExtensionProvider;
  ledger: HWProvider;
};

const AuthentificationContext = React.createContext<{
  loginMethod?: LoginMethodsEnum;
  account?: Account;
  login({
    account,
    loginMethod,
  }: {
    account?: Account;
    loginMethod?: LoginMethodsEnum;
  }): void;
  logout(): void;
  providers: Providers;
} | null>(null);

export const useAuthContext = () => React.useContext(AuthentificationContext);

export const AuthentificationProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const dappCoreContext = useDappCoreContext();
  const transactionsContext = useTransactionsContext();

  const providers = React.useMemo(
    () => ({
      wallet: getWebWalletProvider({ network: dappCoreContext!.networkConfig }),
      walletconnect: getWalletConnectProvider({
        network: dappCoreContext!.networkConfig,
        handleOnLogin: handleWalletConnectLogin,
        handleOnLogout: logout,
      }),
      extension: ExtensionProvider.getInstance(),
      ledger: new HWProvider(),
    }),
    []
  );

  useParseSignedTransactions({ providers });

  async function handleWalletConnectLogin() {
    const address = await providers.walletconnect.getAddress();

    const account = await accountsService.getAccount(
      dappCoreContext!.networkConfig.apiAddress,
      address
    );

    login({
      loginMethod: LoginMethodsEnum.walletconnect,
      account,
    });
  }

  const [auth, setAuth] = useLocalStorageState<{
    account?: Account;
    loginMethod?: LoginMethodsEnum;
    at?: number;
  }>("@autoscale/auth", { defaultValue: {} });

  React.useEffect(() => {
    if (auth.loginMethod === LoginMethodsEnum.wallet || !auth.loginMethod) {
      tryAuthenticateWalletUser();
    }
  }, []);

  React.useEffect(() => {
    if (auth.account) {
      checkIfSessionExpired();
    }
  }, [auth.account]);

  async function checkIfSessionExpired() {
    try {
      const provider = providers[auth!.loginMethod!];

      if (provider instanceof WalletProvider) {
        return;
      }

      if ("setAddress" in provider) {
        await provider.setAddress(auth?.account?.address!);
      }

      if ("init" in provider) {
        await provider.init();
      }

      const address = await provider.getAddress();

      if (address !== auth.account?.address) {
        logout();
      }
    } catch (e) {
      console.error(e);
      logout();
    }
  }

  async function tryAuthenticateWalletUser() {
    const address = new URLSearchParams(window.location.search).get("address");

    if (!address) return;

    const account = await accountsService.getAccount(
      dappCoreContext!.networkConfig.apiAddress,
      address
    );

    if (account) {
      login({
        account,
        loginMethod: LoginMethodsEnum.wallet,
      });
    }

    clearNavigationHistory();
  }

  function login({
    account,
    loginMethod,
  }: {
    account: Account;
    loginMethod: LoginMethodsEnum;
  }) {
    setAuth({
      account,
      loginMethod,
      at: Date.now(),
    });
  }

  function logout() {
    setAuth({});
    transactionsContext?.clearAllTransactions();
  }

  return (
    <AuthentificationContext.Provider
      value={{
        loginMethod: auth.loginMethod,
        account: auth.account,
        login,
        logout,
        providers,
      }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
