import capitalize from 'lodash/capitalize';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SearchIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';

import { FailedIcon } from './FailedIcon';
import { PendingIcon } from './PendingIcon';
import { SuccessIcon } from './SuccessIcon';
import { useNetwork } from '@/lib/dapp-core';
import { formatAddress } from '@/lib/address';

export enum Status {
  FAILED = 'fail',
  SUCCESS = 'success',
  SENT = 'pending',
  CANCELLED = 'cancelled',
  INVALID = 'invalid',
}

const statusInformations = {
  [Status.FAILED]: {
    Icon: FailedIcon,
  },
  [Status.SUCCESS]: {
    Icon: SuccessIcon,
  },
  [Status.SENT]: {
    Icon: PendingIcon,
  },
  [Status.CANCELLED]: {
    Icon: FailedIcon,
  },
  [Status.INVALID]: {
    Icon: FailedIcon,
  },
};

export const TransactionToast = ({
  infos,
}: {
  infos: {
    status: Status;
    transactionHash: string;
    action?: string;
  };
}) => {
  const network = useNetwork();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const toastInformations = statusInformations[infos.status];

  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (infos.status === Status.SUCCESS && !isSuccess) {
      queryClient.invalidateQueries();
      setIsSuccess(true);
    }
  }, [infos.status, isSuccess, queryClient]);

  if (!infos.transactionHash || !toastInformations) return null;

  return (
    <motion.a
      key={infos.transactionHash}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.3 }}
      href={`${network!.explorerAddress}/transactions/${infos.transactionHash}`}
      target="_blank"
      className={`flex cursor-pointer rounded-[8px] border border-[#5a668652] p-2 hover:bg-muted/10 ${
        isSuccess && 'bg-muted/[.08]'
      }`}
      rel="noreferrer"
    >
      <div className="flex w-full min-w-full items-center">
        <div className="mr-4 flex w-[90px] items-center space-x-3">
          {<toastInformations.Icon />}

          <span className="text-[10px] font-bold text-[#959FBB]">
            {capitalize(infos.action) || 'Transaction'}
          </span>
        </div>

        <span className="flex flex-1 text-[10px] font-medium">
          {formatAddress(infos.transactionHash, 11).toLowerCase()}
        </span>

        <SearchIcon className="h-[18px] w-[18px]" />
      </div>
    </motion.a>
  );
};
