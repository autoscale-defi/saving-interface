export interface Network {
  walletAddress: string;
  apiAddress: string;
  explorerAddress: string;
  chainId: string;

  walletConnectDeepLink: string;
  walletConnectRelayAddress: string;
  walletConnectProjectId: string;
  decimals: number;
}
