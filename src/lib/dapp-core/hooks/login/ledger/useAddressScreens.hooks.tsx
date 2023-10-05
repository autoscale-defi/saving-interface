'use client';

import { useState } from 'react';

const defaultAddressesPerPage = 10;

export interface SelectedAddress {
  address: string;
  index: number;
}

export const useAddressScreens = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddress | null>(null);

  const [showAddressList, setShowAddressList] = useState(false);

  const onSelectAddress = (newSelectedAddress: SelectedAddress | null) => {
    setSelectedAddress(newSelectedAddress);
  };

  const onGoToNextPage = () => {
    setSelectedAddress(null);
    setStartIndex((current) => current + 1);
  };

  const onGoToPrevPage = () => {
    setSelectedAddress(null);
    setStartIndex((current) => (current === 0 ? 0 : current - 1));
  };

  return {
    accounts,
    setAccounts,
    isLoading,
    setIsLoading,
    setShowAddressList,
    showAddressList,
    startIndex,
    selectedAddress,
    onGoToPrevPage,
    onGoToNextPage,
    onSelectAddress,
    error,
    setError,
    defaultAddressesPerPage,
  };
};
