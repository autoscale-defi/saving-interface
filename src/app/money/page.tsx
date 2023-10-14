'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DepositTab } from '@/app/money/_components/deposit-tab.component';
import React from 'react';

export default function MyMoney() {
  return (
    <div className="flex flex-row items-center gap-12">
      <Tabs defaultValue="deposit" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="claim">Claim rewards</TabsTrigger>
        </TabsList>
        <TabsContent className="py-4" value="deposit">
          <DepositTab />
        </TabsContent>
        <TabsContent className="py-4" value="withdraw">
          Withdraw
        </TabsContent>
        <TabsContent className="py-4" value="claim">
          Claim rewards
        </TabsContent>
      </Tabs>
    </div>
  );
}
