'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/app/_components/revenue-chart.component';
import { DepositChart } from '@/app/_components/deposit-chart.component';
import { Percent } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 row-span-2">
          <DepositChart />
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fixed APR</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground"></Percent>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6%</div>
            <p className="text-xs text-muted-foreground">+1.5% vs market</p>
          </CardContent>
        </Card>
        <RevenueChart />
      </div>
    </div>
  );
}
