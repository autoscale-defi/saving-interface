import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
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
            <div className="text-md font-bold">1,345 $</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
