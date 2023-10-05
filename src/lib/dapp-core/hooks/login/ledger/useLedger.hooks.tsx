'use client';

import { useEffect } from 'react';

import { useAuthContext } from '../../../providers/Authentification.providers';
import * as accountsService from '../../../services/accounts.services';
import { useDappCoreContext } from '../../../providers/DappCore.providers';
import { LoginMethodsEnum } from '../../../types/login.types';

import { useAddressScreens } from './useAddressScreens.hooks';
import { ledgerErrorCodes } from './ledger.constants';

const failInitializeErrorText = 'Check if the MultiversX App is open on Ledger';
const ledgerAppErrorText = 'Check if the MultiversX app is open on Ledger';
const notConnectedCode = 0x6e01;
const wrongClaCode = 0x6e00;
const inactiveAppCodes = [notConnectedCode, wrongClaCode];

export function getLedgerErrorCodes(err?: any) {
  let errorMessage: string | null = null;
  if (err?.statusCode in ledgerErrorCodes) {
    const statusCode: keyof typeof ledgerErrorCodes = err?.statusCode;
    const { message } = ledgerErrorCodes[statusCode];
    // @ts-ignore
    errorMessage = inactiveAppCodes.includes(statusCode)
      ? ledgerAppErrorText
      : message;
  }
  return {
    errorMessage,
    defaultErrorMessage: ledgerAppErrorText,
  };
}
export function useLedger() {
  const authContext = useAuthContext();
  const dappCoreContext = useDappCoreContext();
  const {
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
    defaultAddressesPerPage: addressesPerPage,
  } = useAddressScreens();

  const hwWalletP = authContext!.providers.ledger;

  const onLoginFailed = (err: any, customMessage?: string) => {
    const { errorMessage } = getLedgerErrorCodes(err);

    if (errorMessage) {
      setError(`${errorMessage}.${customMessage}`);
    }

    setIsLoading(false);
    console.warn(err);
  };

  async function loginUser() {
    if (selectedAddress == null) {
      return false;
    }

    const { index } = selectedAddress;

    try {
      await hwWalletP.init();

      const address = await hwWalletP.login({
        addressIndex: index,
      });

      const account = await accountsService.getAccount(
        dappCoreContext!.networkConfig.apiAddress,
        address
      );

      authContext?.login({
        account,
        loginMethod: LoginMethodsEnum.ledger,
      });
    } catch (err) {
      onLoginFailed(err);
      return false;
    }

    return true;
  }

  async function onConfirmSelectedAddress() {
    setError('');

    try {
      setIsLoading(true);
      if (selectedAddress == null) {
        return false;
      }

      await loginUser();

      setIsLoading(false);
    } catch (err) {
      const { errorMessage } = getLedgerErrorCodes(err);
      if (errorMessage) {
        setError(errorMessage);
      }
      console.warn(failInitializeErrorText, err);
    } finally {
      setIsLoading(false);
    }
    setShowAddressList(false);
    return true;
  }

  async function fetchAccounts() {
    try {
      setIsLoading(true);
      const init = await hwWalletP.init();

      if (!init) {
        return;
      }

      const accounts = await hwWalletP.getAccounts(
        startIndex,
        addressesPerPage
      );

      setAccounts(accounts);
      setIsLoading(false);
    } catch (err) {
      const { errorMessage, defaultErrorMessage } = getLedgerErrorCodes(err);
      setError(errorMessage ?? defaultErrorMessage);
      console.error('error', err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, [startIndex]);

  const loginFailed = Boolean(error);

  return {
    onStartLogin: loginUser,
    loginFailed,
    error,
    isLoading: isLoading && !loginFailed,
    accounts,
    showAddressList,
    startIndex,
    selectedAddress,
    onGoToPrevPage,
    onGoToNextPage,
    onSelectAddress,
    onConfirmSelectedAddress,
  };
}
