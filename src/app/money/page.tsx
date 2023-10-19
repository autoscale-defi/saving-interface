'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DepositTab } from '@/app/money/_components/deposit-tab.component';
import React from 'react';
import { WithdrawTab } from './_components/withdraw-tab.component';
import { Card } from '@/components/ui/card';

export default function MyMoney() {
  return (
    <div className="flex flex-row items-center gap-12">
      <Card className="bg-form px-2 pt-2">
        <Tabs defaultValue="deposit" className="w-full md:w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <DepositTab />
          </TabsContent>
          <TabsContent className="py-2" value="withdraw">
            <WithdrawTab />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
