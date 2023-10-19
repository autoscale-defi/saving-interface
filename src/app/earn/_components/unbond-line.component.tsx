import React from 'react';
import Countdown from 'react-countdown';
import { formatCompactNumber, formatCompactUSDAmount } from '@/lib/amount';
import { Button } from '@/components/ui/button';

const UnbondLine = ({
  assetAmount,
  priceAmount,
  timestamp,
  unbond,
}: {
  assetAmount: number;
  priceAmount: number;
  timestamp: number;
  unbond(): void;
}) => {
  return (
    <div className="flex flex-1 flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-x-2">
        <span className="space-x-1 text-sm">
          <span className="font-bold">{formatCompactNumber(assetAmount)}</span>
          <span className="font-light">USDC</span>
        </span>

        <span className="text-xs font-bold text-muted-foreground">
          {formatCompactUSDAmount(priceAmount)}
        </span>
      </div>
      <Countdown
        date={new Date(0).setTime(timestamp)}
        zeroPadTime={2}
        autoStart
        renderer={(props) => {
          if (props.completed) {
            return <Button onClick={unbond}>Unbond</Button>;
          }

          return (
            <div>
              <span className="mr-2 text-sm font-bold">
                {props.days ? `${props.days} days` : ''}
              </span>
              <span className="text-sm font-bold">
                {`${props.formatted.hours} : ${props.formatted.minutes} : ${props.formatted.seconds}`}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default React.memo(UnbondLine);
