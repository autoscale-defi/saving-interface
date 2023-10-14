'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PercentRange } from '@/components/ui/percent-range';
import React from 'react';

export function DepositTab() {
  const [percent, setPercent] = React.useState(0);
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Deposit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input placeholder="Amount" />
              <Button variant="outline" className="text-xs">
                Max
              </Button>
            </div>

            <div className="max-w-[350px] px-2">
              <PercentRange percent={percent} onChange={setPercent} />
            </div>
          </div>

          <Button className="w-full">Deposit USDC</Button>
        </div>
      </CardContent>
    </Card>
  );
}
