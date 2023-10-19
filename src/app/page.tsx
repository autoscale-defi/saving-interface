'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/app/_components/revenue-chart.component';
import { RevenueCompareChart } from '@/app/_components/revenue-compare-chart.component';
import { Percent, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total deposit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"></DollarSign>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456,000 $</div>
            <p className="text-xs text-muted-foreground">+200,000$ today</p>
          </CardContent>
        </Card>
        <RevenueChart />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <RevenueCompareChart />
        </div>
      </div>
    </div>
  );
}
