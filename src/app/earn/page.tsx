'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DepositTab } from '@/app/earn/_components/deposit-tab.component';
import React from 'react';
import { WithdrawTab } from './_components/withdraw-tab.component';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { UnbondDialog } from '@/app/earn/_components/unbond-dialog-component';
export default function MyMoney() {
  return (
    <div className="flex flex-col items-end gap-4">
      <Card className="bg-form px-4 pt-4">
        <Tabs defaultValue="deposit" className="w-full md:w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <DepositTab />
          </TabsContent>
          <TabsContent value="withdraw">
            <WithdrawTab />
          </TabsContent>
        </Tabs>
      </Card>

      <UnbondDialog />
    </div>
  );
}
