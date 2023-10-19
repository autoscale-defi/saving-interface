import React from 'react';
import Image from 'next/image';
import { formatNumber } from '@/lib/amount';
import { NumericalInput } from '@/components/numerical-input.component';

type Props = {
  amount?: string;
  onUpdateAmount(amount?: string): void;
  balance: number;
  error?: string;
  title?: string;
  disabled?: boolean;
  valueIsLoading?: boolean;
  tokensIsLoading?: boolean;
};

export const TokenForm = (props: Props) => {
  const onSelectMax = () => props.onUpdateAmount(props.balance.toString());

  return (
    <div>
      <div className="mb-2 flex flex-1 items-center justify-between">
        <p className="text-base font-medium">{props.title}</p>

        <p className="w-full flex-1 space-x-1 text-right text-xs font-medium">
          <span className="text-muted-foreground"> Balance:</span>
          <span>{formatNumber(props.balance)}$</span>
        </p>
      </div>

      <div
        className={`rounded-md border bg-input p-2 ${
          Boolean(props.error) ? 'border-red-900/70' : 'border-card'
        }`}
      >
        <div className="flex flex-1 flex-row space-x-4 px-2">
          <Image alt="usdc icon" src={'/usdc.svg'} width={30} height={30} />
          <div className="flex flex-1 items-center justify-between space-x-2">
            {props.valueIsLoading ? (
              <div className="my-2 h-6 w-24 animate-pulse rounded-md bg-background-lighter" />
            ) : (
              <div className="flex w-full flex-col items-end justify-end">
                {props.disabled ? (
                  <span
                    className={`w-full cursor-default py-0 pr-3 text-right text-sm font-semibold ${
                      !props.amount && 'text-muted-foreground'
                    }`}
                  >
                    {formatNumber(Number(props.amount || 0))}
                  </span>
                ) : (
                  <NumericalInput
                    value={props.amount || ''}
                    onUserInput={(value: any) => props.onUpdateAmount(value)}
                    className={`w-full border-0 bg-transparent py-0 text-right text-sm font-semibold focus:ring-0 ${
                      !props.amount && 'text-muted-foreground'
                    }`}
                    placeholder={props.disabled ? '0' : 'Amount'}
                    disabled={props.disabled}
                  />
                )}
              </div>
            )}

            {!props.disabled && (
              <button
                onClick={onSelectMax}
                className="flex h-6 cursor-pointer items-center justify-center rounded-2xl bg-input-button px-4 text-xs font-medium"
              >
                Max
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-end px-2 py-1 text-xs text-red-900">
        {props.error}
      </div>
    </div>
  );
};
