import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import { UnbondCard } from '@/app/_components/unbond-card.componen';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useGetASUUSDCToken } from '@/lib/dapp-core/hooks/accounts/useGetASUUSDCBalance.hook';

export function UnbondDialog() {
  const asuusdc = useGetASUUSDCToken();

  const countOfUnbonding = asuusdc ? asuusdc.length : 0;

  return (
    <Dialog>
      <DialogTrigger disabled={countOfUnbonding < 1}>
        <Button variant="outline" disabled={countOfUnbonding < 1}>
          <div className="flex flex-row items-center space-x-2">
            <span>Consult {countOfUnbonding} Unbonding</span> <ArrowRight />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-lg font-semibold">Unbond</h1>
        <UnbondCard />
      </DialogContent>
    </Dialog>
  );
}
