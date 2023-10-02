export interface Account {
  address: string;
  balance: string;
  nonce: number;
  txCount: number;
  scrCount: number;
  claimableRewards: string;
  code?: string;
  username?: string;
  shard?: number;
  ownerAddress?: string;
  developerReward?: string;
  deployedAt?: number;
  scamInfo?: ScamInfo;
  isUpgradeable?: boolean;
  isReadable?: boolean;
  isPayable?: boolean;
  isPayableBySmartContract?: boolean;
  assets?: Asset;
}

export interface ScamInfo {
  type: string;
  info: string;
}

export interface Asset {
  name: string;
  description: string;
  tags: string[];
  iconPng?: string;
  iconSvg?: string;
}
