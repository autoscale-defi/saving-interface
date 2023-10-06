import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/app/_components/revenue-chart.component';
import { RevenueCompareChart } from '@/app/_components/revenue-compare-chart.component';

export function MyMoneyTab() {
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fixed APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6%</div>
            <p className="text-xs text-muted-foreground">+1.5% vs market</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,034 $</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My USDC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,034 $</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deposit / withdraw
            </CardTitle>
          </CardHeader>
          <CardContent>ICi le formulaire de deposit / withdraw</CardContent>
        </Card>
      </div>
    </div>
  );
}
