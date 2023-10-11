import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row md:gap-12">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Fixed APY</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-xl font-bold">6%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1,034 $</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">My USDC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">2,034 $</div>
          </CardContent>
        </Card>
      </div>

      {children}
    </div>
  );
}
