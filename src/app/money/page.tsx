import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyMoney() {
  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Fixed APY</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">6%</div>
            <p className="text-xs text-muted-foreground">+1.5% vs market</p>
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
