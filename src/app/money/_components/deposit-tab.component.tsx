import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DepositTab() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Deposit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input placeholder="Amount" />
            <Button variant="outline" className="text-xs">
              Max
            </Button>
          </div>

          <Button className="w-full">Deposit USDC</Button>
        </div>
      </CardContent>
    </Card>
  );
}
