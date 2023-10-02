import * as React from "react";

import { useDappCoreContext } from "../../providers/DappCore.providers";
import { useAuthContext } from "../../providers/Authentification.providers";

export enum WalletConnectV2Error {
  invalidAddress = "Invalid address",
  invalidConfig = "Invalid WalletConnect setup",
  invalidTopic = "Expired connection",
  sessionExpired = "Unable to connect to existing session",
  connectError = "Unable to connect",
  userRejected = "User rejected connection proposal",
  userRejectedExisting = "User rejected existing connection proposal",
  errorLogout = "Unable to remove existing pairing",
}

export enum DappCoreWCV2CustomMethodsEnum {
  mvx_cancelAction = "mvx_cancelAction",
}

export const useWalletConnect = () => {
  const dappCoreContext = useDappCoreContext();
  const authContext = useAuthContext();

  const [error, setError] = React.useState<string>("");
  const [wcUri, setWcUri] = React.useState<string>("");

  const dappMethods: string[] = [
    DappCoreWCV2CustomMethodsEnum.mvx_cancelAction,
  ];

  const uriDeepLink = `${
    dappCoreContext!.networkConfig?.walletConnectDeepLink
  }?wallet-connect=${encodeURIComponent(wcUri)}`;

  async function initiateLogin() {
    await generateWcUri();
  }

  async function generateWcUri() {
    try {
      await authContext!.providers.walletconnect.init();

      const { uri, approval } =
        await authContext!.providers.walletconnect.connect({
          methods: dappMethods,
        });

      if (!uri) {
        return;
      }

      setWcUri(uri);

      try {
        await authContext!.providers.walletconnect?.login({ approval });
      } catch (err) {
        setError(WalletConnectV2Error.userRejected);

        await generateWcUri();
      }
    } catch (err) {
      setError(WalletConnectV2Error.connectError);
    }
  }

  return {
    initiateLogin,
    error,
    uriDeepLink,
    walletConnectUri: wcUri,
  };
};
