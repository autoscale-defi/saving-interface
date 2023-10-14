'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetUSDCBalance } from '@/lib/dapp-core/hooks/accounts/useGetUSDCBalance.hooks';
import { formatUSDAmount } from '@/lib/amount';
import { Placeholder } from '@/components/ui/placeholder';

export default function Layout({ children }: { children: React.ReactNode }) {
  const USDCBalance = useGetUSDCBalance();

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div>{children}</div>
      <div className="flex flex-row gap-2 md:flex-col">
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium">Fixed APY</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-md font-bold">6%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-xs font-medium">My USDC</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-md font-bold">
              {USDCBalance || 0 ? (
                formatUSDAmount(USDCBalance)
              ) : (
                <Placeholder />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
